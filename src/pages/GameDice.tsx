import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Dice5 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const GameDice = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [betAmount, setBetAmount] = useState(100);
  const [target, setTarget] = useState(50);
  const [isOver, setIsOver] = useState(true);
  const [rolling, setRolling] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  const [won, setWon] = useState<boolean | null>(null);
  const [history, setHistory] = useState<{ roll: number; target: number; over: boolean; win: boolean }[]>([]);

  const winChance = isOver ? 100 - target : target;
  const multiplierCalc = Math.max(1.01, Math.floor((98 / winChance) * 100) / 100);
  const payout = Math.floor(betAmount * multiplierCalc);

  const rollDice = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    setRolling(true);
    setResult(null);
    setWon(null);

    // Animate for 1.5s
    setTimeout(() => {
      const roll = Math.floor(Math.random() * 10001) / 100; // 0.00 - 100.00
      const didWin = isOver ? roll > target : roll < target;
      setResult(roll);
      setWon(didWin);
      setRolling(false);
      setHistory((prev) => [{ roll, target, over: isOver, win: didWin }, ...prev.slice(0, 19)]);
    }, 1500);
  };

  const quickBets = [50, 100, 500, 1000, 5000];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
        <button onClick={() => navigate("/")} className="text-muted-foreground">
          <ArrowLeft size={20} />
        </button>
        <div className="flex items-center gap-2">
          <Dice5 className="text-primary" size={20} />
          <h1 className="font-display text-lg font-bold text-foreground">ডাইস গেম</h1>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* History */}
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
          {history.map((h, i) => (
            <span
              key={i}
              className={`px-2 py-0.5 rounded text-xs font-display font-bold shrink-0 ${
                h.win ? "bg-neon-green/20 text-neon-green" : "bg-neon-red/20 text-neon-red"
              }`}
            >
              {h.roll.toFixed(2)}
            </span>
          ))}
        </div>

        {/* Dice result area */}
        <div className="relative rounded-xl bg-card border border-border p-8 flex flex-col items-center justify-center" style={{ minHeight: "200px" }}>
          <AnimatePresence mode="wait">
            {rolling ? (
              <motion.div
                key="rolling"
                animate={{ rotateZ: [0, 360, 720, 1080] }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="w-24 h-24 rounded-2xl bg-gradient-gold flex items-center justify-center"
              >
                <Dice5 size={48} className="text-primary-foreground" />
              </motion.div>
            ) : result !== null ? (
              <motion.div
                key="result"
                initial={{ scale: 0, rotateZ: 180 }}
                animate={{ scale: 1, rotateZ: 0 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="text-center"
              >
                <div
                  className={`w-28 h-28 rounded-2xl flex items-center justify-center mx-auto mb-3 ${
                    won ? "bg-neon-green/20 border-2 border-neon-green" : "bg-neon-red/20 border-2 border-neon-red"
                  }`}
                >
                  <span className={`font-display text-4xl font-black ${won ? "text-neon-green" : "text-neon-red"}`}>
                    {result.toFixed(2)}
                  </span>
                </div>
                <p className={`font-bold text-lg ${won ? "text-neon-green" : "text-neon-red"}`}>
                  {won ? `+৳${payout}` : `-৳${betAmount}`}
                </p>
              </motion.div>
            ) : (
              <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
                <Dice5 size={48} className="text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground text-sm">রোল করতে বেট দিন</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Slider & target */}
        <div className="bg-card rounded-xl border border-border p-4 space-y-4">
          {/* Over/Under toggle */}
          <div className="flex gap-2">
            <button
              onClick={() => setIsOver(true)}
              className={`flex-1 py-2.5 rounded-lg font-display font-bold text-sm transition-colors ${
                isOver ? "bg-neon-green/20 text-neon-green border border-neon-green/50" : "bg-secondary text-muted-foreground"
              }`}
            >
              ওভার
            </button>
            <button
              onClick={() => setIsOver(false)}
              className={`flex-1 py-2.5 rounded-lg font-display font-bold text-sm transition-colors ${
                !isOver ? "bg-neon-red/20 text-neon-red border border-neon-red/50" : "bg-secondary text-muted-foreground"
              }`}
            >
              আন্ডার
            </button>
          </div>

          {/* Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0</span>
              <span className="font-display font-bold text-foreground text-base">{target}</span>
              <span>100</span>
            </div>
            <Slider
              value={[target]}
              onValueChange={([v]) => setTarget(v)}
              min={5}
              max={95}
              step={1}
              disabled={rolling}
            />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-secondary rounded-lg p-2">
              <p className="text-[10px] text-muted-foreground">মাল্টিপ্লায়ার</p>
              <p className="font-display font-bold text-primary text-sm">{multiplierCalc}x</p>
            </div>
            <div className="bg-secondary rounded-lg p-2">
              <p className="text-[10px] text-muted-foreground">উইন চান্স</p>
              <p className="font-display font-bold text-foreground text-sm">{winChance}%</p>
            </div>
            <div className="bg-secondary rounded-lg p-2">
              <p className="text-[10px] text-muted-foreground">পেআউট</p>
              <p className="font-display font-bold text-neon-green text-sm">৳{payout}</p>
            </div>
          </div>
        </div>

        {/* Bet controls */}
        <div className="bg-card rounded-xl border border-border p-4 space-y-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setBetAmount(Math.max(10, betAmount / 2))}
              className="px-3 py-2 rounded-lg bg-secondary text-foreground font-bold text-sm"
              disabled={rolling}
            >
              ½
            </button>
            <input
              type="number"
              value={betAmount}
              onChange={(e) => setBetAmount(Math.max(10, Number(e.target.value)))}
              className="flex-1 bg-secondary rounded-lg px-3 py-2 text-foreground font-display text-center text-lg font-bold border-none outline-none"
              disabled={rolling}
            />
            <button
              onClick={() => setBetAmount(betAmount * 2)}
              className="px-3 py-2 rounded-lg bg-secondary text-foreground font-bold text-sm"
              disabled={rolling}
            >
              2x
            </button>
          </div>

          <div className="flex gap-2">
            {quickBets.map((amt) => (
              <button
                key={amt}
                onClick={() => setBetAmount(amt)}
                disabled={rolling}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  betAmount === amt
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                ৳{amt}
              </button>
            ))}
          </div>

          <Button
            onClick={rollDice}
            disabled={rolling}
            className="w-full h-14 text-xl font-display font-black bg-gradient-gold disabled:opacity-50"
          >
            {rolling ? "রোলিং..." : `রোল ডাইস ৳${betAmount}`}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GameDice;
