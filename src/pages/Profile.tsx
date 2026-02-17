import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ChevronRight, Wallet, ArrowDownToLine, ArrowUpFromLine, History, Shield, Settings, LogOut, HelpCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const menuItems = [
  { icon: Wallet, label: "আমার ওয়ালেট", path: "/deposit", color: "text-primary" },
  { icon: ArrowDownToLine, label: "ডিপোজিট", path: "/deposit", color: "text-neon-green" },
  { icon: ArrowUpFromLine, label: "উইথড্র", path: "/withdraw", color: "text-primary" },
  { icon: History, label: "বেট হিস্ট্রি", path: "/profile", color: "text-foreground" },
  { icon: Shield, label: "নিরাপত্তা", path: "/profile", color: "text-neon-red" },
  { icon: HelpCircle, label: "সাহায্য ও সাপোর্ট", path: "/profile", color: "text-foreground" },
];

const Profile = () => {
  const { user, signOut, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    if (user) {
      supabase.from("profiles").select("*").eq("user_id", user.id).single().then(({ data }) => setProfile(data));
    }
  }, [user]);

  const handleLogout = async () => {
    await signOut();
    toast.success("লগআউট হয়েছে");
    navigate("/");
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 pb-24">
        <div className="text-center">
          <h2 className="font-display text-xl font-bold text-foreground mb-4">লগইন করুন</h2>
          <p className="text-muted-foreground text-sm mb-6">প্রোফাইল দেখতে লগইন করুন</p>
          <Link to="/login" className="inline-block px-8 py-3 bg-gradient-gold text-primary-foreground font-display font-bold rounded-xl shadow-gold">লগইন</Link>
        </div>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="flex items-center justify-between h-14 px-4">
          <div className="flex items-center">
            <Link to="/" className="p-2 -ml-2"><ArrowLeft size={20} className="text-foreground" /></Link>
            <h1 className="font-display text-base font-bold text-foreground ml-2">প্রোফাইল</h1>
          </div>
          {isAdmin && (
            <Link to="/admin" className="px-3 py-1.5 bg-destructive/20 text-destructive text-xs font-display font-bold rounded-lg">
              অ্যাডমিন
            </Link>
          )}
        </div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-4 mt-4 space-y-4">
        <div className="bg-secondary rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-full bg-gradient-gold flex items-center justify-center shadow-gold">
              <span className="font-display text-xl font-bold text-primary-foreground">{profile?.full_name?.[0] || "U"}</span>
            </div>
            <div className="flex-1">
              <h2 className="font-semibold text-foreground">{profile?.full_name || "ব্যবহারকারী"}</h2>
              <p className="text-sm text-muted-foreground">{profile?.phone || user.email}</p>
              <p className="text-xs text-primary font-display mt-0.5">ID: #{user.id.slice(0, 8)}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "ব্যালেন্স", value: `৳${profile?.balance?.toFixed(2) || "0.00"}`, cls: "text-primary" },
            { label: "টার্নওভার", value: `৳${profile?.turnover?.toFixed(2) || "0.00"}`, cls: "text-neon-green" },
            { label: "মোট উপার্জন", value: `৳${profile?.total_earnings?.toFixed(2) || "0.00"}`, cls: "text-foreground" },
          ].map((item) => (
            <div key={item.label} className="bg-card rounded-xl p-3 text-center border border-border">
              <p className="text-[10px] text-muted-foreground">{item.label}</p>
              <p className={`font-display text-sm font-bold mt-1 ${item.cls}`}>{item.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2">
          {[
            { label: "মোট ডিপোজিট", value: `৳${profile?.total_deposit?.toFixed(2) || "0.00"}` },
            { label: "মোট উইথড্র", value: `৳${profile?.total_withdraw?.toFixed(2) || "0.00"}` },
            { label: "বোনাস", value: `৳${profile?.bonus_balance?.toFixed(2) || "0.00"}` },
            { label: "মোট লস", value: `৳${profile?.total_loss?.toFixed(2) || "0.00"}` },
          ].map((item) => (
            <div key={item.label} className="bg-card rounded-xl p-3 text-center border border-border">
              <p className="text-[10px] text-muted-foreground">{item.label}</p>
              <p className="font-display text-sm font-bold mt-1 text-foreground">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="bg-card rounded-xl border border-border overflow-hidden">
          {menuItems.map((item, i) => (
            <Link key={i} to={item.path} className={`flex items-center justify-between p-4 hover:bg-secondary transition-colors ${i !== menuItems.length - 1 ? "border-b border-border" : ""}`}>
              <div className="flex items-center gap-3">
                <item.icon size={18} className={item.color} />
                <span className="text-sm font-semibold text-foreground">{item.label}</span>
              </div>
              <ChevronRight size={16} className="text-muted-foreground" />
            </Link>
          ))}
        </div>

        <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive hover:bg-destructive/20 transition-colors">
          <LogOut size={18} />
          <span className="text-sm font-semibold">লগআউট</span>
        </button>
      </motion.div>
      <BottomNav />
    </div>
  );
};

export default Profile;
