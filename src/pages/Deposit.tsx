import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Copy, CheckCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import BottomNav from "@/components/BottomNav";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const paymentMethods = [
  { id: "bkash", name: "বিকাশ", color: "bg-[hsl(330,80%,45%)]", number: "01648946140", logo: "b" },
  { id: "nagad", name: "নগদ", color: "bg-[hsl(25,90%,50%)]", number: "01648946140", logo: "N" },
  { id: "rocket", name: "রকেট", color: "bg-[hsl(270,60%,45%)]", number: "01648946140", logo: "R" },
];

const amounts = [500, 1000, 2000, 5000, 10000, 20000];

const Deposit = () => {
  const [selectedMethod, setSelectedMethod] = useState("bkash");
  const [amount, setAmount] = useState("");
  const [txnId, setTxnId] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const activeMethod = paymentMethods.find((m) => m.id === selectedMethod)!;

  const handleCopy = () => {
    navigator.clipboard.writeText(activeMethod.number);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDeposit = async () => {
    if (!user) {
      toast.error("প্রথমে লগইন করুন");
      navigate("/login");
      return;
    }
    const amt = parseFloat(amount);
    if (!amt || amt < 500) {
      toast.error("সর্বনিম্ন ৳৫০০ ডিপোজিট করতে হবে");
      return;
    }
    if (!txnId.trim()) {
      toast.error("ট্রানজেকশন আইডি দিন");
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("deposits").insert({
      user_id: user.id,
      amount: amt,
      payment_method: selectedMethod,
      transaction_id: txnId.trim(),
    });
    setLoading(false);
    if (error) {
      toast.error("ডিপোজিট রিকোয়েস্ট ব্যর্থ হয়েছে");
    } else {
      toast.success("ডিপোজিট রিকোয়েস্ট পাঠানো হয়েছে! অ্যাডমিন অ্যাপ্রুভ করলে ব্যালেন্স যোগ হবে।");
      setAmount("");
      setTxnId("");
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="flex items-center h-14 px-4">
          <Link to="/" className="p-2 -ml-2"><ArrowLeft size={20} className="text-foreground" /></Link>
          <h1 className="font-display text-base font-bold text-foreground ml-2">ডিপোজিট</h1>
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

        <div className="bg-secondary rounded-xl p-4">
          <p className="text-xs text-muted-foreground mb-1">{activeMethod.name} এজেন্ট নম্বর</p>
          <div className="flex items-center justify-between">
            <span className="font-display text-lg font-bold text-primary">{activeMethod.number}</span>
            <button onClick={handleCopy} className="p-2 rounded-lg bg-card hover:bg-card/80 transition-colors">
              {copied ? <CheckCircle size={16} className="text-neon-green" /> : <Copy size={16} className="text-muted-foreground" />}
            </button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            উপরের নম্বরে {activeMethod.name} থেকে Send Money করুন, তারপর Transaction ID দিন
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-foreground mb-3">পরিমাণ (৳)</h2>
          <div className="grid grid-cols-3 gap-2 mb-3">
            {amounts.map((a) => (
              <button key={a} onClick={() => setAmount(String(a))}
                className={`py-2.5 rounded-lg text-sm font-semibold transition-all ${amount === String(a) ? "bg-gradient-gold text-primary-foreground shadow-gold" : "bg-card border border-border text-foreground hover:border-primary/50"}`}>
                ৳{a.toLocaleString()}
              </button>
            ))}
          </div>
          <Input type="number" placeholder="অন্য পরিমাণ লিখুন" value={amount} onChange={(e) => setAmount(e.target.value)} className="bg-card border-border focus:border-primary h-12 text-foreground" />
        </div>

        <div>
          <h2 className="text-sm font-semibold text-foreground mb-3">ট্রানজেকশন আইডি</h2>
          <Input placeholder="আপনার ট্রানজেকশন আইডি লিখুন" value={txnId} onChange={(e) => setTxnId(e.target.value)} className="bg-card border-border focus:border-primary h-12 text-foreground" />
        </div>

        <Button onClick={handleDeposit} disabled={loading} className="w-full h-12 bg-gradient-gold text-primary-foreground font-display font-bold text-base shadow-gold hover:opacity-90 transition-opacity">
          {loading ? "প্রসেসিং..." : "ডিপোজিট রিকোয়েস্ট পাঠান"}
        </Button>

        <p className="text-xs text-muted-foreground text-center">সর্বনিম্ন ৳৫০০ • সর্বোচ্চ ৳৫০,০০০ • অ্যাডমিন অ্যাপ্রুভ করলে জমা হবে</p>
      </motion.div>
      <BottomNav />
    </div>
  );
};

export default Deposit;
