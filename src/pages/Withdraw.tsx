import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import BottomNav from "@/components/BottomNav";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const paymentMethods = [
  { id: "bkash", name: "বিকাশ", color: "bg-[hsl(330,80%,45%)]", logo: "b" },
  { id: "nagad", name: "নগদ", color: "bg-[hsl(25,90%,50%)]", logo: "N" },
  { id: "rocket", name: "রকেট", color: "bg-[hsl(270,60%,45%)]", logo: "R" },
];

const Withdraw = () => {
  const [selectedMethod, setSelectedMethod] = useState("bkash");
  const [amount, setAmount] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleWithdraw = async () => {
    if (!user) { toast.error("প্রথমে লগইন করুন"); navigate("/login"); return; }
    const amt = parseFloat(amount);
    if (!amt || amt < 500) { toast.error("সর্বনিম্ন ৳৫০০ উইথড্র করতে হবে"); return; }
    if (!accountNumber.trim()) { toast.error("অ্যাকাউন্ট নম্বর দিন"); return; }
    
    setLoading(true);
    const { error } = await supabase.from("withdrawals").insert({
      user_id: user.id,
      amount: amt,
      payment_method: selectedMethod,
      account_number: accountNumber.trim(),
    });
    setLoading(false);
    if (error) {
      toast.error("উইথড্র রিকোয়েস্ট ব্যর্থ হয়েছে");
    } else {
      toast.success("উইথড্র রিকোয়েস্ট পাঠানো হয়েছে!");
      setAmount("");
      setAccountNumber("");
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="flex items-center h-14 px-4">
          <Link to="/" className="p-2 -ml-2"><ArrowLeft size={20} className="text-foreground" /></Link>
          <h1 className="font-display text-base font-bold text-foreground ml-2">উইথড্র</h1>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="px-4 mt-4 space-y-6">
        <div>
          <h2 className="text-sm font-semibold text-foreground mb-3">পেমেন্ট পদ্ধতি নির্বাচন করুন</h2>
          <div className="grid grid-cols-3 gap-2">
            {paymentMethods.map((m) => (
              <button key={m.id} onClick={() => setSelectedMethod(m.id)}
                className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all ${selectedMethod === m.id ? "border-primary bg-secondary shadow-gold" : "border-border bg-card hover:border-muted-foreground/30"}`}>
                <div className={`w-10 h-10 rounded-full ${m.color} flex items-center justify-center`}>
                  <span className="text-xs font-bold text-foreground">{m.logo}</span>
                </div>
                <span className="text-xs font-semibold text-foreground">{m.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-foreground mb-3">আপনার {paymentMethods.find(m => m.id === selectedMethod)?.name} নম্বর</h2>
          <Input type="tel" placeholder="01XXXXXXXXX" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} className="bg-card border-border focus:border-primary h-12 text-foreground" />
        </div>

        <div>
          <h2 className="text-sm font-semibold text-foreground mb-3">পরিমাণ (৳)</h2>
          <div className="grid grid-cols-3 gap-2 mb-3">
            {[500, 1000, 2000, 5000, 10000, 20000].map((a) => (
              <button key={a} onClick={() => setAmount(String(a))}
                className={`py-2.5 rounded-lg text-sm font-semibold transition-all ${amount === String(a) ? "bg-gradient-gold text-primary-foreground shadow-gold" : "bg-card border border-border text-foreground hover:border-primary/50"}`}>
                ৳{a.toLocaleString()}
              </button>
            ))}
          </div>
          <Input type="number" placeholder="অন্য পরিমাণ লিখুন" value={amount} onChange={(e) => setAmount(e.target.value)} className="bg-card border-border focus:border-primary h-12 text-foreground" />
        </div>

        <Button onClick={handleWithdraw} disabled={loading} className="w-full h-12 bg-gradient-gold text-primary-foreground font-display font-bold text-base shadow-gold hover:opacity-90 transition-opacity">
          {loading ? "প্রসেসিং..." : "উইথড্র রিকোয়েস্ট পাঠান"}
        </Button>

        <p className="text-xs text-muted-foreground text-center">সর্বনিম্ন ৳৫০০ • টার্নওভার পূরণ হলে উইথড্র করা যাবে</p>
      </motion.div>
      <BottomNav />
    </div>
  );
};

export default Withdraw;
