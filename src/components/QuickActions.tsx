import { ArrowDownToLine, ArrowUpFromLine, Gift, Headphones } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const actions = [
  { icon: ArrowDownToLine, label: "ডিপোজিট", path: "/deposit", color: "text-neon-green" },
  { icon: ArrowUpFromLine, label: "উইথড্র", path: "/withdraw", color: "text-primary" },
  { icon: Gift, label: "বোনাস", path: "/bonus", color: "text-neon-red" },
  { icon: Headphones, label: "সাপোর্ট", path: "/support", color: "text-foreground" },
];

const QuickActions = () => {
  return (
    <div className="px-4 mt-4">
      <div className="grid grid-cols-4 gap-2">
        {actions.map((action, i) => (
          <motion.div
            key={action.path}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
          >
            <Link
              to={action.path}
              className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors"
            >
              <action.icon size={22} className={action.color} />
              <span className="text-xs font-semibold text-foreground">{action.label}</span>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
