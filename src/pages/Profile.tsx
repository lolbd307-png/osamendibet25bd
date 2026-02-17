import { motion } from "framer-motion";
import { ArrowLeft, ChevronRight, Wallet, ArrowDownToLine, ArrowUpFromLine, History, Shield, Settings, LogOut, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import BottomNav from "@/components/BottomNav";

const menuItems = [
  { icon: Wallet, label: "আমার ওয়ালেট", path: "/wallet", color: "text-primary" },
  { icon: ArrowDownToLine, label: "ডিপোজিট হিস্ট্রি", path: "/deposit-history", color: "text-neon-green" },
  { icon: ArrowUpFromLine, label: "উইথড্র হিস্ট্রি", path: "/withdraw-history", color: "text-primary" },
  { icon: History, label: "বেট হিস্ট্রি", path: "/bet-history", color: "text-foreground" },
  { icon: Shield, label: "নিরাপত্তা", path: "/security", color: "text-neon-red" },
  { icon: Settings, label: "সেটিংস", path: "/settings", color: "text-muted-foreground" },
  { icon: HelpCircle, label: "সাহায্য ও সাপোর্ট", path: "/support", color: "text-foreground" },
];

const Profile = () => {
  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="flex items-center h-14 px-4">
          <Link to="/" className="p-2 -ml-2">
            <ArrowLeft size={20} className="text-foreground" />
          </Link>
          <h1 className="font-display text-base font-bold text-foreground ml-2">প্রোফাইল</h1>
        </div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-4 mt-4 space-y-4">
        {/* User Info Card */}
        <div className="bg-secondary rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-full bg-gradient-gold flex items-center justify-center shadow-gold">
              <span className="font-display text-xl font-bold text-primary-foreground">U</span>
            </div>
            <div className="flex-1">
              <h2 className="font-semibold text-foreground">ব্যবহারকারী</h2>
              <p className="text-sm text-muted-foreground">+880 1XXXXXXXXX</p>
              <p className="text-xs text-primary font-display mt-0.5">ID: #000000</p>
            </div>
          </div>
        </div>

        {/* Balance Cards */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "ব্যালেন্স", value: "৳0.00", sub: "text-primary" },
            { label: "টার্নওভার", value: "৳0.00", sub: "text-neon-green" },
            { label: "মোট উপার্জন", value: "৳0.00", sub: "text-foreground" },
          ].map((item) => (
            <div key={item.label} className="bg-card rounded-xl p-3 text-center border border-border">
              <p className="text-[10px] text-muted-foreground">{item.label}</p>
              <p className={`font-display text-sm font-bold mt-1 ${item.sub}`}>{item.value}</p>
            </div>
          ))}
        </div>

        {/* Menu */}
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          {menuItems.map((item, i) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center justify-between p-4 hover:bg-secondary transition-colors ${
                i !== menuItems.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon size={18} className={item.color} />
                <span className="text-sm font-semibold text-foreground">{item.label}</span>
              </div>
              <ChevronRight size={16} className="text-muted-foreground" />
            </Link>
          ))}
        </div>

        {/* Logout */}
        <button className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive hover:bg-destructive/20 transition-colors">
          <LogOut size={18} />
          <span className="text-sm font-semibold">লগআউট</span>
        </button>
      </motion.div>

      <BottomNav />
    </div>
  );
};

export default Profile;
