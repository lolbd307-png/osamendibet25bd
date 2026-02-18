import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Rocket, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const GameCrash = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [betAmount, setBetAmount] = useState(100);
  const [multiplier, setMultiplier] = useState(1.0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCrashed, setIsCrashed] = useState(false);
  const [cashedOut, setCashedOut] = useState(false);
  const [cashOutAt, setCashOutAt] = useState(0);
  const [history, setHistory] = useState<{ mult: number; win: boolean }[]>([]);
  const animRef = useRef<number>(0);
  const startTime = useRef(0);
  const crashPoint = useRef(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateCrashPoint = () => {
    const r = Math.random();
    // House edge ~3%
    return Math.max(1.0, Math.floor((1 / (1 - r)) * 100) / 100);
  };

  const drawGraph = useCallback((currentMult: number, crashed: boolean) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    // Grid lines
    ctx.strokeStyle = "hsla(220, 15%, 25%, 0.4)";
    ctx.lineWidth = 1;
    for (let i = 1; i < 5; i++) {
      const y = h - (i / 5) * h;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // Curve
    const maxMult = Math.max(currentMult, 2);
    ctx.beginPath();
    ctx.strokeStyle = crashed ? "hsl(0, 85%, 55%)" : "hsl(145, 80%, 50%)";
    ctx.lineWidth = 3;
    ctx.shadowBlur = crashed ? 0 : 15;
    ctx.shadowColor = crashed ? "transparent" : "hsla(145, 80%, 50%, 0.5)";

    const steps = 200;
    for (let i = 0; i <= steps; i++) {
      const progress = i / steps;
      const t = progress * (currentMult - 1);
      const x = progress * w;
      // Exponential curve feel
      const y = h - ((1 + t - 1) / (maxMult - 1 + 0.5)) * (h * 0.85) - h * 0.05;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Rocket at end
    if (!crashed) {
      const endX = w;
      const endY = h - ((currentMult - 1) / (maxMult - 1 + 0.5)) * (h * 0.85) - h * 0.05;
      ctx.fillStyle = "hsl(40, 90%, 55%)";
      ctx.beginPath();
      ctx.arc(endX - 5, endY, 6, 0, Math.PI * 2);
      ctx.fill();
    }
  }, []);

  const startGame = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    crashPoint.current = generateCrashPoint();
    setMultiplier(1.0);
    setIsPlaying(true);
    setIsCrashed(false);
    setCashedOut(false);
    setCashOutAt(0);
    startTime.current = Date.now();
    animate();
  };

  const animate = () => {
    const elapsed = (Date.now() - startTime.current) / 1000;
    // Exponential growth: 1.0 * e^(0.06t) per 100ms -> ~6% per second
    const newMult = Math.floor(Math.pow(Math.E, elapsed * 0.15) * 100) / 100;

    if (newMult >= crashPoint.current) {
      setMultiplier(crashPoint.current);
      setIsCrashed(true);
      setIsPlaying(false);
      drawGraph(crashPoint.current, true);
      setHistory((prev) => [{ mult: crashPoint.current, win: false }, ...prev.slice(0, 19)]);
      return;
    }

    setMultiplier(newMult);
    drawGraph(newMult, false);
    animRef.current = requestAnimationFrame(animate);
  };

  const cashOut = () => {
    if (!isPlaying || isCrashed || cashedOut) return;
    cancelAnimationFrame(animRef.current);
    setCashedOut(true);
    setCashOutAt(multiplier);
    setIsPlaying(false);
    setHistory((prev) => [{ mult: multiplier, win: true }, ...prev.slice(0, 19)]);
  };

  useEffect(() => {
    // Set canvas size
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
    }
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  const quickBets = [50, 100, 500, 1000, 5000];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
        <button onClick={() => navigate("/")} className="text-muted-foreground">
          <ArrowLeft size={20} />
        </button>
        <div className="flex items-center gap-2">
          <Rocket className="text-primary" size={20} />
          <h1 className="font-display text-lg font-bold text-foreground">ক্র্যাশ গেম</h1>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* History bar */}
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
          {history.map((h, i) => (
            <span
              key={i}
              className={`px-2 py-0.5 rounded text-xs font-display font-bold shrink-0 ${
                h.win ? "bg-neon-green/20 text-neon-green" : "bg-neon-red/20 text-neon-red"
              }`}
            >
              {h.mult.toFixed(2)}x
            </span>
          ))}
        </div>

        {/* Graph area */}
        <div className="relative rounded-xl bg-card border border-border overflow-hidden" style={{ height: "280px" }}>
          <canvas ref={canvasRef} className="w-full h-full" />

          {/* Multiplier overlay */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <AnimatePresence mode="wait">
              {isCrashed ? (
                <motion.div
                  key="crashed"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center"
                >
                  <p className="font-display text-5xl font-black text-neon-red">
                    {multiplier.toFixed(2)}x
                  </p>
                  <p className="text-neon-red font-bold text-lg mt-1">ক্র্যাশ!</p>
                </motion.div>
              ) : cashedOut ? (
                <motion.div
                  key="cashed"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center"
                >
                  <p className="font-display text-5xl font-black text-neon-green">
                    {cashOutAt.toFixed(2)}x
                  </p>
                  <p className="text-neon-green font-bold text-lg mt-1">
                    +৳{(betAmount * cashOutAt).toFixed(0)}
                  </p>
                </motion.div>
              ) : isPlaying ? (
                <motion.p
                  key="playing"
                  className="font-display text-6xl font-black text-foreground"
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ repeat: Infinity, duration: 0.5 }}
                >
                  {multiplier.toFixed(2)}x
                </motion.p>
              ) : (
                <motion.div key="idle" className="text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <TrendingUp size={40} className="text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground font-body text-sm">বেট দিয়ে শুরু করুন</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Bet controls */}
        <div className="bg-card rounded-xl border border-border p-4 space-y-3">
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">বেটের পরিমাণ (৳)</label>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setBetAmount(Math.max(10, betAmount / 2))}
                className="px-3 py-2 rounded-lg bg-secondary text-foreground font-bold text-sm"
                disabled={isPlaying}
              >
                ½
              </button>
              <input
                type="number"
                value={betAmount}
                onChange={(e) => setBetAmount(Math.max(10, Number(e.target.value)))}
                className="flex-1 bg-secondary rounded-lg px-3 py-2 text-foreground font-display text-center text-lg font-bold border-none outline-none"
                disabled={isPlaying}
              />
              <button
                onClick={() => setBetAmount(betAmount * 2)}
                className="px-3 py-2 rounded-lg bg-secondary text-foreground font-bold text-sm"
                disabled={isPlaying}
              >
                2x
              </button>
            </div>
          </div>

          <div className="flex gap-2">
            {quickBets.map((amt) => (
              <button
                key={amt}
                onClick={() => setBetAmount(amt)}
                disabled={isPlaying}
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

          {isPlaying ? (
            <Button
              onClick={cashOut}
              className="w-full h-14 text-xl font-display font-black bg-neon-green hover:bg-neon-green/90 text-primary-foreground"
            >
              ক্যাশ আউট @ {multiplier.toFixed(2)}x
            </Button>
          ) : (
            <Button
              onClick={startGame}
              className="w-full h-14 text-xl font-display font-black bg-gradient-gold"
            >
              বেট ৳{betAmount}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameCrash;
