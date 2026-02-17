import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, Smartphone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-gold flex items-center justify-center mx-auto mb-4 shadow-gold">
            <span className="font-display text-xl font-bold text-primary-foreground">OB</span>
          </div>
          <h1 className="font-display text-2xl font-bold text-gradient-gold tracking-wider">
            OSAMENDI BET 25
          </h1>
          <p className="text-muted-foreground text-sm mt-1">আপনার অ্যাকাউন্টে লগইন করুন</p>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div className="relative">
            <Smartphone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="tel"
              placeholder="মোবাইল নম্বর"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="pl-10 bg-secondary border-border focus:border-primary h-12 text-foreground"
            />
          </div>

          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="পাসওয়ার্ড"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pr-10 bg-secondary border-border focus:border-primary h-12 text-foreground"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <Button className="w-full h-12 bg-gradient-gold text-primary-foreground font-display font-bold text-base shadow-gold hover:opacity-90 transition-opacity">
            লগইন
          </Button>

          <div className="text-center">
            <Link to="/forgot-password" className="text-sm text-primary hover:underline">
              পাসওয়ার্ড ভুলে গেছেন?
            </Link>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-muted-foreground text-sm">
            অ্যাকাউন্ট নেই?{" "}
            <Link to="/register" className="text-primary font-semibold hover:underline">
              নিবন্ধন করুন
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
