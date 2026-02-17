import { motion } from "framer-motion";
import { Play } from "lucide-react";

interface GameCardProps {
  name: string;
  image: string;
  provider: string;
  maxBet?: string;
  index: number;
}

const GameCard = ({ name, image, provider, maxBet, index }: GameCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
      className="group relative rounded-xl overflow-hidden bg-card border border-border hover:border-primary/50 transition-all cursor-pointer hover:shadow-gold"
    >
      <div className="aspect-square relative overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center shadow-gold">
            <Play size={20} className="text-primary-foreground ml-0.5" />
          </div>
        </div>
        {/* Max bet badge */}
        {maxBet && (
          <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-background/80 backdrop-blur-sm">
            <span className="text-[10px] font-semibold text-primary">MAX ৳{maxBet}</span>
          </div>
        )}
      </div>
      <div className="p-2">
        <h3 className="text-xs font-semibold text-foreground truncate">{name}</h3>
        <p className="text-[10px] text-muted-foreground">{provider}</p>
      </div>
    </motion.div>
  );
};

export default GameCard;
