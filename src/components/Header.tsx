import { Bell, User, Wallet } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container flex items-center justify-between h-14 px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-gold flex items-center justify-center">
            <span className="font-display text-xs font-bold text-primary-foreground">OB</span>
          </div>
          <span className="font-display text-sm font-bold text-gradient-gold tracking-wider">
            OSAMENDI BET 25
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            to="/deposit"
            className="flex items-center gap-1.5 bg-gradient-gold text-primary-foreground px-3 py-1.5 rounded-lg text-sm font-semibold"
          >
            <Wallet size={14} />
            <span>৳0.00</span>
          </Link>
          <button className="relative p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors">
            <Bell size={18} className="text-muted-foreground" />
            <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-neon-red rounded-full border-2 border-background" />
          </button>
          <Link to="/profile" className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors">
            <User size={18} className="text-muted-foreground" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
