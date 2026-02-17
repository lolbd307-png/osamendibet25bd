import { useState } from "react";
import { Flame, Dice1, Tv, TrendingUp, Trophy, Gamepad2, Fish, Star } from "lucide-react";
import { motion } from "framer-motion";

const categories = [
  { id: "hot", label: "হট গেমস", icon: Flame },
  { id: "slots", label: "স্লটস", icon: Dice1 },
  { id: "live", label: "লাইভ", icon: Tv },
  { id: "crash", label: "ক্র্যাশ", icon: TrendingUp },
  { id: "sports", label: "স্পোর্টস", icon: Trophy },
  { id: "cards", label: "কার্ড", icon: Gamepad2 },
  { id: "fishing", label: "ফিশিং", icon: Fish },
  { id: "popular", label: "জনপ্রিয়", icon: Star },
];

interface CategoryTabsProps {
  activeCategory: string;
  onCategoryChange: (id: string) => void;
}

const CategoryTabs = ({ activeCategory, onCategoryChange }: CategoryTabsProps) => {
  return (
    <div className="px-4 mt-4">
      <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id)}
              className={`relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? "bg-gradient-gold text-primary-foreground shadow-gold"
                  : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
              }`}
            >
              <cat.icon size={14} />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryTabs;
