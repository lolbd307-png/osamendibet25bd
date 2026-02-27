import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface GameCardProps {
  name: string;
  image: string;
  provider: string;
  maxBet?: string;
  index: number;
}

const gameRouteMap: Record<string, string> = {
  "Aviator": "/game/crash", "Crash Rocket": "/game/crash", "Speed Crash": "/game/crash",
  "JetX": "/game/crash", "Spaceman": "/game/crash", "Balloon": "/game/crash",
  "Lucky Crumbling": "/game/crash", "Cappadocia": "/game/crash", "Hi-Lo Crash": "/game/crash", "Limbo": "/game/crash",
  "FlyX": "/game/crash", "Go Rush": "/game/crash",
  "Lucky Dice": "/game/dice", "Dice Duel": "/game/dice", "7up 7down": "/game/dice",
  "Dic Drop": "/game/dice", "Sic Bo": "/game/dice", "Fan Tan": "/game/dice",
  "Mines Gold": "/game/mines", "Mine Strike": "/game/mines", "Mines": "/game/mines",
  "Clover Coins 3x3": "/game/mines",
  "Fortune Wheel": "/game/wheel", "Mega Wheel": "/game/wheel", "Crazy Time": "/game/wheel",
  "Dream Catcher": "/game/wheel", "Monopoly Live": "/game/wheel",
  "Fortune Roulette": "/game/wheel", "Dragon Gems Wheel": "/game/wheel",
  "Plinko Ball": "/game/plinko",
  "Tower Rush": "/game/tower",
  "Keno Classic": "/game/keno",
};

const GameCard = ({ name, image, provider, index }: GameCardProps) => {
  const navigate = useNavigate();
  const route = gameRouteMap[name];

  const handleClick = () => {
    if (route) navigate(route);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2, delay: Math.min(index * 0.015, 0.3) }}
      onClick={handleClick}
      className="group relative rounded-xl overflow-hidden cursor-pointer"
    >
      <div className="aspect-square relative overflow-hidden rounded-xl">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {/* Provider badge top-right */}
        <div className="absolute top-1.5 right-1.5 flex flex-col items-end gap-1">
          <div className="px-1 py-0.5 rounded bg-background/60 backdrop-blur-sm">
            <span className="text-[8px] font-bold text-primary uppercase leading-none">{provider}</span>
          </div>
          <Heart size={16} className="text-white/80 drop-shadow-md hover:text-red-400 transition-colors" />
        </div>
        {/* Game name overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent px-1.5 pb-1.5 pt-6">
          <h3 className="text-[10px] font-bold text-white truncate leading-tight drop-shadow-lg">{name}</h3>
        </div>
      </div>
    </motion.div>
  );
};

export default GameCard;
