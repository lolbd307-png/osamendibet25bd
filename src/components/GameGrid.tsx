import GameCard from "./GameCard";
import { games } from "@/data/games";

interface GameGridProps {
  category: string;
}

const GameGrid = ({ category }: GameGridProps) => {
  const filtered = games.filter((g) => g.category.includes(category));

  return (
    <div className="px-4 mt-4 pb-24">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-display text-sm font-bold text-foreground tracking-wide">
          {category === "hot" ? "🔥 হট গেমস" : 
           category === "slots" ? "🎰 স্লটস" :
           category === "live" ? "📺 লাইভ ক্যাসিনো" :
           category === "crash" ? "🚀 ক্র্যাশ" :
           category === "sports" ? "⚽ স্পোর্টস" :
           category === "cards" ? "🃏 কার্ড গেমস" :
           category === "fishing" ? "🐟 ফিশিং" :
           "⭐ জনপ্রিয়"}
        </h2>
        <span className="text-xs text-muted-foreground">{filtered.length} গেমস</span>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2.5">
        {filtered.map((game, i) => (
          <GameCard
            key={game.id}
            name={game.name}
            image={game.image}
            provider={game.provider}
            maxBet={game.maxBet}
            index={i}
          />
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p>এই ক্যাটাগরিতে কোনো গেম নেই</p>
        </div>
      )}
    </div>
  );
};

export default GameGrid;
