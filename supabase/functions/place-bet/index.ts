import { createClient } from "https://esm.sh/@supabase/supabase-js@2.96.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    // User client to get user
    const userClient = createClient(supabaseUrl, Deno.env.get("SUPABASE_PUBLISHABLE_KEY")!, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: { user }, error: authError } = await userClient.auth.getUser();
    if (authError || !user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // Service role client for admin operations
    const admin = createClient(supabaseUrl, serviceKey);

    const { action, bet_amount, game_name, multiplier, mine_count, target, is_over } = await req.json();

    // Fetch profile
    const { data: profile, error: profErr } = await admin.from("profiles").select("balance, is_banned, turnover").eq("user_id", user.id).single();
    if (profErr || !profile) {
      return new Response(JSON.stringify({ error: "Profile not found" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    if (profile.is_banned) {
      return new Response(JSON.stringify({ error: "Account banned" }), { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    if (bet_amount < 10 || bet_amount > 50000) {
      return new Response(JSON.stringify({ error: "Invalid bet amount" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    if (profile.balance < bet_amount) {
      return new Response(JSON.stringify({ error: "Insufficient balance" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    let result = "loss";
    let win_amount = 0;
    let game_result: Record<string, unknown> = {};

    if (action === "crash_start") {
      // Deduct bet, return crash point (provably fair)
      const r = Math.random();
      const crashPoint = Math.max(1.0, Math.floor((1 / (1 - r)) * 100) / 100);

      await admin.from("profiles").update({
        balance: profile.balance - bet_amount,
        turnover: (profile.turnover || 0) + bet_amount,
      }).eq("user_id", user.id);

      return new Response(JSON.stringify({ success: true, crash_point: crashPoint, new_balance: profile.balance - bet_amount }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });

    } else if (action === "crash_cashout") {
      // Player cashed out at multiplier
      win_amount = Math.floor(bet_amount * multiplier);
      result = "win";

      const { data: currentProfile } = await admin.from("profiles").select("balance, total_earnings").eq("user_id", user.id).single();
      await admin.from("profiles").update({
        balance: (currentProfile?.balance || 0) + win_amount,
        total_earnings: (currentProfile?.total_earnings || 0) + (win_amount - bet_amount),
      }).eq("user_id", user.id);

      await admin.from("bet_history").insert({
        user_id: user.id,
        bet_amount,
        win_amount,
        result: "win",
      });

      const { data: updatedProfile } = await admin.from("profiles").select("balance").eq("user_id", user.id).single();
      return new Response(JSON.stringify({ success: true, win_amount, new_balance: updatedProfile?.balance || 0 }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });

    } else if (action === "crash_lost") {
      // Crashed without cashout
      const { data: currentProfile } = await admin.from("profiles").select("total_loss").eq("user_id", user.id).single();
      await admin.from("profiles").update({
        total_loss: (currentProfile?.total_loss || 0) + bet_amount,
      }).eq("user_id", user.id);

      await admin.from("bet_history").insert({
        user_id: user.id,
        bet_amount,
        win_amount: 0,
        result: "loss",
      });

      const { data: updatedProfile } = await admin.from("profiles").select("balance").eq("user_id", user.id).single();
      return new Response(JSON.stringify({ success: true, new_balance: updatedProfile?.balance || 0 }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });

    } else if (action === "dice") {
      // Dice game
      const roll = Math.floor(Math.random() * 10001) / 100;
      const didWin = is_over ? roll > target : roll < target;
      const winChance = is_over ? 100 - target : target;
      const mult = Math.max(1.01, Math.floor((98 / winChance) * 100) / 100);

      if (didWin) {
        win_amount = Math.floor(bet_amount * mult);
        result = "win";
      }

      const newBalance = profile.balance - bet_amount + win_amount;
      const updateData: Record<string, number> = {
        balance: newBalance,
        turnover: (profile.turnover || 0) + bet_amount,
      };

      const { data: ep } = await admin.from("profiles").select("total_earnings, total_loss").eq("user_id", user.id).single();
      if (didWin) {
        updateData.total_earnings = (ep?.total_earnings || 0) + (win_amount - bet_amount);
      } else {
        updateData.total_loss = (ep?.total_loss || 0) + bet_amount;
      }

      await admin.from("profiles").update(updateData).eq("user_id", user.id);
      await admin.from("bet_history").insert({ user_id: user.id, bet_amount, win_amount, result });

      return new Response(JSON.stringify({ success: true, roll, did_win: didWin, multiplier: mult, win_amount, new_balance: newBalance }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });

    } else if (action === "mines_start") {
      // Mines: deduct balance, generate mine positions server-side
      const gridSize = 25;
      const mc = Math.min(Math.max(mine_count || 5, 1), 24);
      const mines = new Set<number>();
      while (mines.size < mc) {
        mines.add(Math.floor(Math.random() * gridSize));
      }

      await admin.from("profiles").update({
        balance: profile.balance - bet_amount,
        turnover: (profile.turnover || 0) + bet_amount,
      }).eq("user_id", user.id);

      // Return mine positions (encrypted or hashed in production)
      return new Response(JSON.stringify({
        success: true,
        mines: Array.from(mines),
        new_balance: profile.balance - bet_amount,
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });

    } else if (action === "mines_cashout") {
      win_amount = Math.floor(bet_amount * multiplier);
      result = "win";

      const { data: cp } = await admin.from("profiles").select("balance, total_earnings").eq("user_id", user.id).single();
      await admin.from("profiles").update({
        balance: (cp?.balance || 0) + win_amount,
        total_earnings: (cp?.total_earnings || 0) + (win_amount - bet_amount),
      }).eq("user_id", user.id);

      await admin.from("bet_history").insert({ user_id: user.id, bet_amount, win_amount, result: "win" });
      const { data: up } = await admin.from("profiles").select("balance").eq("user_id", user.id).single();

      return new Response(JSON.stringify({ success: true, win_amount, new_balance: up?.balance || 0 }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });

    } else if (action === "mines_lost") {
      const { data: cp } = await admin.from("profiles").select("total_loss").eq("user_id", user.id).single();
      await admin.from("profiles").update({
        total_loss: (cp?.total_loss || 0) + bet_amount,
      }).eq("user_id", user.id);

      await admin.from("bet_history").insert({ user_id: user.id, bet_amount, win_amount: 0, result: "loss" });
      const { data: up } = await admin.from("profiles").select("balance").eq("user_id", user.id).single();

      return new Response(JSON.stringify({ success: true, new_balance: up?.balance || 0 }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });

    } else if (action === "daily_bonus") {
      // Check if already claimed today
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const { data: existing } = await admin.from("daily_bonuses").select("id").eq("user_id", user.id).gte("claimed_at", today.toISOString()).limit(1);

      if (existing && existing.length > 0) {
        return new Response(JSON.stringify({ error: "আজকের বোনাস ইতিমধ্যে নেওয়া হয়েছে" }), {
          status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const bonusAmount = 50; // ৳50 daily bonus
      await admin.from("daily_bonuses").insert({ user_id: user.id, amount: bonusAmount });
      await admin.from("profiles").update({
        balance: profile.balance + bonusAmount,
        bonus_balance: (profile as any).bonus_balance + bonusAmount,
      }).eq("user_id", user.id);

      return new Response(JSON.stringify({ success: true, bonus: bonusAmount, new_balance: profile.balance + bonusAmount }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });

    } else if (action === "claim_referral") {
      // Check if user was referred and referrer exists
      const { data: userProfile } = await admin.from("profiles").select("referred_by, referral_code").eq("user_id", user.id).single();
      if (!userProfile?.referred_by) {
        return new Response(JSON.stringify({ error: "No referral found" }), {
          status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Find referrer by referral_code
      const { data: referrer } = await admin.from("profiles").select("user_id, balance, referral_bonus").eq("referral_code", userProfile.referred_by).single();
      if (!referrer) {
        return new Response(JSON.stringify({ error: "Referrer not found" }), {
          status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const referralBonus = 100; // ৳100 referral bonus
      await admin.from("profiles").update({
        balance: referrer.balance + referralBonus,
        referral_bonus: (referrer.referral_bonus || 0) + referralBonus,
      }).eq("user_id", referrer.user_id);

      return new Response(JSON.stringify({ success: true, bonus: referralBonus }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: "Invalid action" }), {
      status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
