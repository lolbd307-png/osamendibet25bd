import { useState, useMemo } from "react";
import { ArrowLeft, Search, Clock, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { games, providers } from "@/data/games";
import GameCard from "@/components/GameCard";

const SlotsPage = () => {
  const navigate = useNavigate();
  const [activeProvider, setActiveProvider] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    let result = games.filter((g) => g.category.includes("slots"));
    if (activeProvider !== "All") {
      result = result.filter((g) => g.provider === activeProvider);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((g) => g.name.toLowerCase().includes(q));
    }
    return result;
  }, [activeProvider, searchQuery]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/30">
        <div className="flex items-center justify-center px-4 py-3 relative">
          <button
            onClick={() => navigate(-1)}
            className="absolute left-4 text-primary"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="font-display text-lg font-bold text-primary">Slots</h1>
        </div>
      </div>

      {/* Provider Filter Tabs */}
      <div className="px-3 pt-3">
        <div className="bg-card/50 rounded-xl p-2 border border-border/30">
          <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
            {providers.map((p) => (
              <button
                key={p}
                onClick={() => setActiveProvider(p)}
                className={`px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all border ${
                  activeProvider === p
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-muted-foreground border-border hover:text-foreground"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-3 pt-3">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Game name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-primary/60 focus:outline-none focus:border-primary"
            />
            <Search size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-primary" />
          </div>
          <button className="w-12 h-12 rounded-xl bg-card border border-border flex items-center justify-center text-primary">
            <Clock size={20} />
          </button>
          <button className="w-12 h-12 rounded-xl bg-card border border-border flex items-center justify-center text-primary">
            <Star size={20} />
          </button>
        </div>
      </div>

      {/* Game Grid */}
      <div className="px-3 pt-3 pb-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProvider + searchQuery}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-3 gap-2.5"
          >
            {filtered.map((game, i) => (
              <GameCard
                key={game.name + i}
                name={game.name}
                image={game.image}
                provider={game.provider}
                maxBet={game.maxBet}
                index={i}
              />
            ))}
          </motion.div>
        </AnimatePresence>
        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-sm">No games found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SlotsPage;
