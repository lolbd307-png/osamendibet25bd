import gameSlots from "@/assets/game-slots.jpg";
import gameRoulette from "@/assets/game-roulette.jpg";
import gameCrash from "@/assets/game-crash.jpg";
import gameCards from "@/assets/game-cards.jpg";
import gameSports from "@/assets/game-sports.jpg";
import gameDice from "@/assets/game-dice.jpg";
import gameFishing from "@/assets/game-fishing.jpg";
import gameWheel from "@/assets/game-wheel.jpg";
import gameDragon from "@/assets/game-dragon.jpg";
import gamePoker from "@/assets/game-poker.jpg";
import gameBaccarat from "@/assets/game-baccarat.jpg";
import gameCricket from "@/assets/game-cricket.jpg";
import gameMines from "@/assets/game-mines.jpg";
import gameTower from "@/assets/game-tower.jpg";
import gamePlinko from "@/assets/game-plinko.jpg";
import gameKeno from "@/assets/game-keno.jpg";

export interface GameData {
  name: string;
  image: string;
  provider: string;
  category: string[];
  maxBet: string;
}

const imgs = {
  slots: gameSlots,
  roulette: gameRoulette,
  crash: gameCrash,
  cards: gameCards,
  sports: gameSports,
  dice: gameDice,
  fishing: gameFishing,
  wheel: gameWheel,
  dragon: gameDragon,
  poker: gamePoker,
  baccarat: gameBaccarat,
  cricket: gameCricket,
  mines: gameMines,
  tower: gameTower,
  plinko: gamePlinko,
  keno: gameKeno,
};

export const games: GameData[] = [
  // HOT GAMES
  { name: "SuperAce", image: imgs.cards, provider: "JILI", category: ["hot", "slots", "popular"], maxBet: "5000" },
  { name: "Aviator", image: imgs.crash, provider: "SPRIBE", category: ["hot", "crash", "popular"], maxBet: "5000" },
  { name: "Wild Bounty Showdown", image: imgs.dragon, provider: "PG", category: ["hot", "slots"], maxBet: "8000" },
  { name: "Royal Ace", image: imgs.cards, provider: "Yellow Bat", category: ["hot", "slots"], maxBet: "5000" },
  { name: "Boxing King", image: imgs.sports, provider: "JILI", category: ["hot", "slots"], maxBet: "6000" },
  { name: "Poker Kingdom", image: imgs.poker, provider: "PG", category: ["hot", "slots"], maxBet: "8000" },
  { name: "Fortune Gems 3", image: imgs.dragon, provider: "JILI", category: ["hot", "slots"], maxBet: "5000" },
  { name: "Magic Ace", image: imgs.cards, provider: "JDB", category: ["hot", "slots"], maxBet: "4000" },
  { name: "Circus Joker 4", image: imgs.wheel, provider: "JILI", category: ["hot", "slots"], maxBet: "3000" },
  { name: "Money Coming", image: imgs.slots, provider: "JILI", category: ["hot", "slots", "popular"], maxBet: "10000" },

  // SLOTS - JILI
  { name: "SuperAce Deluxe", image: imgs.cards, provider: "JILI", category: ["slots"], maxBet: "5000" },
  { name: "Fortune Gems", image: imgs.dragon, provider: "JILI", category: ["slots", "popular"], maxBet: "5000" },
  { name: "Fortune Gems 2", image: imgs.dragon, provider: "JILI", category: ["slots"], maxBet: "5000" },
  { name: "Golden Empire", image: imgs.tower, provider: "JILI", category: ["slots"], maxBet: "6000" },
  { name: "Ali Baba", image: imgs.tower, provider: "JILI", category: ["slots"], maxBet: "4000" },
  { name: "SuperAce II", image: imgs.cards, provider: "JILI", category: ["slots"], maxBet: "5000" },
  { name: "Clover Coins 3x3", image: imgs.mines, provider: "JILI", category: ["slots"], maxBet: "3000" },
  { name: "Legacy of Egypt", image: imgs.dragon, provider: "JILI", category: ["slots"], maxBet: "8000" },
  { name: "7up 7down", image: imgs.dice, provider: "JILI", category: ["slots"], maxBet: "2000" },
  { name: "Coin Tree", image: imgs.dragon, provider: "JILI", category: ["slots"], maxBet: "4000" },
  { name: "Mines", image: imgs.mines, provider: "JILI", category: ["slots", "crash"], maxBet: "5000" },
  { name: "Master Tiger", image: imgs.dragon, provider: "JILI", category: ["slots"], maxBet: "6000" },
  { name: "Dic Drop", image: imgs.dice, provider: "JILI", category: ["slots"], maxBet: "3000" },
  { name: "MoneyO", image: imgs.slots, provider: "JILI", category: ["slots"], maxBet: "5000" },
  { name: "Go Rush", image: imgs.crash, provider: "JILI", category: ["slots", "crash"], maxBet: "4000" },
  { name: "Ascent Charge Buffalo", image: imgs.dragon, provider: "JILI", category: ["slots"], maxBet: "8000" },
  { name: "Lucky Jaguar", image: imgs.dragon, provider: "JILI", category: ["slots"], maxBet: "5000" },
  { name: "Chicken Jash", image: imgs.fishing, provider: "JILI", category: ["slots"], maxBet: "3000" },
  { name: "Fortune Coins", image: imgs.wheel, provider: "JILI", category: ["slots"], maxBet: "5000" },
  { name: "Aztec Priestess", image: imgs.tower, provider: "JILI", category: ["slots"], maxBet: "6000" },
  { name: "3 Witch's", image: imgs.wheel, provider: "JILI", category: ["slots"], maxBet: "4000" },
  { name: "SuperAce Classic", image: imgs.cards, provider: "JILI", category: ["slots"], maxBet: "5000" },
  { name: "Fortune Roulette", image: imgs.roulette, provider: "JILI", category: ["slots"], maxBet: "8000" },
  { name: "Devil Fire 2", image: imgs.crash, provider: "JILI", category: ["slots"], maxBet: "5000" },
  { name: "40 Sparkling", image: imgs.slots, provider: "JILI", category: ["slots"], maxBet: "4000" },
  { name: "Jackpot Jo", image: imgs.slots, provider: "JILI", category: ["slots"], maxBet: "6000" },
  { name: "Jungle King", image: imgs.dragon, provider: "JILI", category: ["slots"], maxBet: "5000" },
  { name: "Bangla Beauty", image: imgs.cards, provider: "JILI", category: ["slots"], maxBet: "4000" },
  { name: "Trump Card", image: imgs.poker, provider: "JDB", category: ["slots", "cards"], maxBet: "5000" },

  // SLOTS - PG
  { name: "Wild Ape", image: imgs.dragon, provider: "PG", category: ["slots"], maxBet: "5000" },
  { name: "Pinata Wins", image: imgs.wheel, provider: "PG", category: ["slots"], maxBet: "4000" },
  { name: "Anubis Wrath", image: imgs.tower, provider: "PG", category: ["slots"], maxBet: "6000" },
  { name: "Fortune Dragon", image: imgs.dragon, provider: "PG", category: ["slots", "popular"], maxBet: "8000" },
  { name: "Cocktail", image: imgs.fishing, provider: "PG", category: ["slots"], maxBet: "3000" },
  { name: "Fortune Rabbit", image: imgs.cards, provider: "PG", category: ["slots"], maxBet: "5000" },
  { name: "Double Fortune", image: imgs.cards, provider: "PG", category: ["slots"], maxBet: "4000" },
  { name: "Lucky Neko", image: imgs.slots, provider: "PG", category: ["slots"], maxBet: "5000" },
  { name: "Mahjong Ways", image: imgs.cards, provider: "PG", category: ["slots"], maxBet: "6000" },
  { name: "Asgardian", image: imgs.tower, provider: "PG", category: ["slots"], maxBet: "8000" },
  { name: "Mystic Potion", image: imgs.wheel, provider: "PG", category: ["slots"], maxBet: "4000" },
  { name: "Legend of Perseus", image: imgs.tower, provider: "PG", category: ["slots"], maxBet: "6000" },
  { name: "Oishi Delights", image: imgs.fishing, provider: "PG", category: ["slots"], maxBet: "3000" },
  { name: "Dreams of Macau", image: imgs.cards, provider: "PG", category: ["slots"], maxBet: "5000" },
  { name: "Ganesha", image: imgs.tower, provider: "PG", category: ["slots"], maxBet: "5000" },
  { name: "Speed Winner", image: imgs.crash, provider: "PG", category: ["slots"], maxBet: "8000" },
  { name: "Mafia Mayhem", image: imgs.poker, provider: "PG", category: ["slots"], maxBet: "5000" },
  { name: "Jack", image: imgs.tower, provider: "PG", category: ["slots"], maxBet: "4000" },
  { name: "Midas Fortune", image: imgs.dragon, provider: "PG", category: ["slots"], maxBet: "6000" },
  { name: "Leprechaun Riches", image: imgs.wheel, provider: "PG", category: ["slots"], maxBet: "5000" },
  { name: "Kraken Gold Rush", image: imgs.fishing, provider: "PG", category: ["slots"], maxBet: "6000" },
  { name: "Safari Wilds", image: imgs.dragon, provider: "PG", category: ["slots"], maxBet: "5000" },
  { name: "Fortune Ox", image: imgs.dragon, provider: "PG", category: ["slots"], maxBet: "8000" },
  { name: "Museum Wonders", image: imgs.tower, provider: "PG", category: ["slots"], maxBet: "4000" },
  { name: "Pirate Queen 2", image: imgs.cards, provider: "JILI", category: ["slots"], maxBet: "5000" },
  { name: "Diamond", image: imgs.wheel, provider: "JILI", category: ["slots"], maxBet: "3000" },

  // SLOTS - OTHER PROVIDERS
  { name: "Super Elements", image: imgs.crash, provider: "FA CHAI", category: ["slots"], maxBet: "4000" },
  { name: "Roma Gladiatrix", image: imgs.tower, provider: "FA CHAI", category: ["slots"], maxBet: "6000" },
  { name: "Queen of Inca", image: imgs.dragon, provider: "FA CHAI", category: ["slots"], maxBet: "5000" },
  { name: "Treasure Raiders", image: imgs.tower, provider: "FA CHAI", category: ["slots"], maxBet: "4000" },
  { name: "Chinese New Year", image: imgs.dragon, provider: "FA CHAI", category: ["slots"], maxBet: "5000" },
  { name: "777 Classic Style", image: imgs.slots, provider: "BT Gaming", category: ["slots"], maxBet: "3000" },
  { name: "Christmas Surprises 3", image: imgs.wheel, provider: "BT Gaming", category: ["slots"], maxBet: "2000" },
  { name: "Money Rush", image: imgs.wheel, provider: "BT Gaming", category: ["slots"], maxBet: "5000" },
  { name: "FlyX", image: imgs.crash, provider: "Microgaming", category: ["slots", "crash"], maxBet: "4000" },
  { name: "Wildfire Wins", image: imgs.wheel, provider: "Microgaming", category: ["slots"], maxBet: "5000" },
  { name: "Power Sun", image: imgs.crash, provider: "BNG", category: ["slots"], maxBet: "6000" },
  { name: "Super Hot Chilli", image: imgs.crash, provider: "BNG", category: ["slots"], maxBet: "4000" },
  { name: "3 Pots of Egypt", image: imgs.dragon, provider: "BNG", category: ["slots"], maxBet: "5000" },
  { name: "777 Coins", image: imgs.slots, provider: "BNG", category: ["slots"], maxBet: "3000" },
  { name: "888", image: imgs.slots, provider: "Spadegaming", category: ["slots"], maxBet: "4000" },
  { name: "Fiery Sevens", image: imgs.crash, provider: "Spadegaming", category: ["slots"], maxBet: "5000" },
  { name: "Royale House", image: imgs.cards, provider: "Spadegaming", category: ["slots"], maxBet: "6000" },
  { name: "Piggy Bank", image: imgs.wheel, provider: "JDB", category: ["slots"], maxBet: "3000" },
  { name: "Blossom of Wealth", image: imgs.dragon, provider: "JDB", category: ["slots"], maxBet: "8000" },
  { name: "Dragon Gems Wheel", image: imgs.wheel, provider: "Yellow Bat", category: ["slots"], maxBet: "5000" },
  { name: "JetX", image: imgs.crash, provider: "SmartSoft", category: ["slots", "crash"], maxBet: "4000" },
  { name: "Gates of Olympus", image: imgs.tower, provider: "Pragmatic", category: ["slots", "popular"], maxBet: "5000" },
  { name: "3 Coin Treasures", image: imgs.wheel, provider: "JILI", category: ["slots"], maxBet: "4000" },
  { name: "Sugar Bang Bang 2", image: imgs.wheel, provider: "JDB", category: ["slots"], maxBet: "3000" },
  { name: "Coin Volcanoes", image: imgs.crash, provider: "JILI", category: ["slots"], maxBet: "5000" },
  { name: "Mr Treasure Fortune", image: imgs.dragon, provider: "PG", category: ["slots"], maxBet: "6000" },
  { name: "Songkran Splash", image: imgs.fishing, provider: "PG", category: ["slots"], maxBet: "4000" },
  { name: "High Flyer", image: imgs.crash, provider: "JILI", category: ["slots"], maxBet: "5000" },
  { name: "Zombie Outbreak", image: imgs.tower, provider: "PG", category: ["slots"], maxBet: "4000" },
  { name: "Geisha", image: imgs.cards, provider: "PG", category: ["slots"], maxBet: "5000" },

  // LIVE CASINO
  { name: "Lightning Roulette", image: imgs.roulette, provider: "Evolution", category: ["live", "popular"], maxBet: "15000" },
  { name: "Baccarat VIP", image: imgs.baccarat, provider: "Evolution", category: ["live", "cards"], maxBet: "20000" },
  { name: "Mega Wheel", image: imgs.wheel, provider: "Pragmatic", category: ["live", "popular"], maxBet: "8000" },
  { name: "Live Poker", image: imgs.poker, provider: "Evolution", category: ["live", "cards"], maxBet: "12000" },
  { name: "Speed Baccarat", image: imgs.baccarat, provider: "Evolution", category: ["live"], maxBet: "10000" },
  { name: "Crazy Time", image: imgs.wheel, provider: "Evolution", category: ["live", "popular"], maxBet: "5000" },
  { name: "Dream Catcher", image: imgs.wheel, provider: "Evolution", category: ["live"], maxBet: "3000" },
  { name: "Auto Roulette", image: imgs.roulette, provider: "Evolution", category: ["live"], maxBet: "8000" },
  { name: "Casino Hold'em", image: imgs.poker, provider: "Evolution", category: ["live", "cards"], maxBet: "6000" },
  { name: "Sic Bo", image: imgs.dice, provider: "Evolution", category: ["live"], maxBet: "5000" },
  { name: "Monopoly Live", image: imgs.wheel, provider: "Evolution", category: ["live", "popular"], maxBet: "4000" },
  { name: "Football Studio", image: imgs.sports, provider: "Evolution", category: ["live", "sports"], maxBet: "3000" },
  { name: "Fan Tan", image: imgs.dice, provider: "Evolution", category: ["live"], maxBet: "5000" },
  { name: "Lightning Baccarat", image: imgs.baccarat, provider: "Evolution", category: ["live"], maxBet: "15000" },
  { name: "Dragon Tiger", image: imgs.dragon, provider: "SA Gaming", category: ["live", "cards"], maxBet: "8000" },
  { name: "Live Roulette", image: imgs.roulette, provider: "Evolution", category: ["live"], maxBet: "10000" },

  // CRASH GAMES
  { name: "Crash Rocket", image: imgs.crash, provider: "SPRIBE", category: ["crash"], maxBet: "2000" },
  { name: "Speed Crash", image: imgs.crash, provider: "Turbo Games", category: ["crash"], maxBet: "2500" },
  { name: "Spaceman", image: imgs.crash, provider: "Pragmatic", category: ["crash"], maxBet: "4000" },
  { name: "Balloon", image: imgs.crash, provider: "SmartSoft", category: ["crash"], maxBet: "2000" },
  { name: "Tower Rush", image: imgs.tower, provider: "EvoPlay", category: ["crash"], maxBet: "3500" },
  { name: "Lucky Crumbling", image: imgs.crash, provider: "EvoPlay", category: ["crash"], maxBet: "2000" },
  { name: "Cappadocia", image: imgs.crash, provider: "SmartSoft", category: ["crash"], maxBet: "3000" },
  { name: "Mine Strike", image: imgs.mines, provider: "SPRIBE", category: ["crash", "popular"], maxBet: "5000" },
  { name: "Dice Duel", image: imgs.dice, provider: "SPRIBE", category: ["crash"], maxBet: "2500" },
  { name: "Hi-Lo Crash", image: imgs.crash, provider: "SPRIBE", category: ["crash"], maxBet: "1500" },
  { name: "Keno Classic", image: imgs.keno, provider: "SPRIBE", category: ["crash"], maxBet: "2000" },
  { name: "Limbo", image: imgs.crash, provider: "SPRIBE", category: ["crash"], maxBet: "3000" },
  { name: "Plinko Ball", image: imgs.plinko, provider: "BGaming", category: ["crash", "hot"], maxBet: "3000" },

  // SPORTS
  { name: "Football Bet", image: imgs.sports, provider: "BetRadar", category: ["sports"], maxBet: "15000" },
  { name: "Cricket Bet", image: imgs.cricket, provider: "BetRadar", category: ["sports", "popular"], maxBet: "20000" },
  { name: "Kabaddi Bet", image: imgs.sports, provider: "Betsoft", category: ["sports"], maxBet: "10000" },
  { name: "Basketball Live", image: imgs.sports, provider: "BetRadar", category: ["sports"], maxBet: "12000" },
  { name: "Tennis Match", image: imgs.sports, provider: "BetRadar", category: ["sports"], maxBet: "8000" },
  { name: "IPL Betting", image: imgs.cricket, provider: "BetRadar", category: ["sports", "popular"], maxBet: "25000" },
  { name: "BPL Live", image: imgs.cricket, provider: "BetRadar", category: ["sports"], maxBet: "15000" },
  { name: "Horse Racing", image: imgs.sports, provider: "BetRadar", category: ["sports"], maxBet: "10000" },
  { name: "E-Sports DOTA", image: imgs.sports, provider: "BetRadar", category: ["sports"], maxBet: "5000" },
  { name: "Boxing Bet", image: imgs.sports, provider: "BetRadar", category: ["sports"], maxBet: "8000" },

  // CARD GAMES
  { name: "Hi-Lo Card", image: imgs.cards, provider: "Microgaming", category: ["cards"], maxBet: "1500" },
  { name: "Andar Bahar", image: imgs.cards, provider: "Ezugi", category: ["cards", "live", "popular"], maxBet: "5000" },
  { name: "Teen Patti", image: imgs.cards, provider: "Ezugi", category: ["cards", "popular"], maxBet: "3000" },
  { name: "Texas Poker", image: imgs.poker, provider: "Microgaming", category: ["cards"], maxBet: "8000" },
  { name: "3 Card Poker", image: imgs.poker, provider: "Evolution", category: ["cards"], maxBet: "5000" },
  { name: "Brag Card", image: imgs.cards, provider: "Playtech", category: ["cards"], maxBet: "2000" },
  { name: "Red Dog", image: imgs.cards, provider: "Microgaming", category: ["cards"], maxBet: "3000" },
  { name: "Pai Gow", image: imgs.cards, provider: "Playtech", category: ["cards"], maxBet: "4000" },
  { name: "War Card", image: imgs.cards, provider: "Betsoft", category: ["cards"], maxBet: "2500" },
  { name: "Punto Banco", image: imgs.baccarat, provider: "NetEnt", category: ["cards"], maxBet: "10000" },
  { name: "Caribbean Stud", image: imgs.poker, provider: "NetEnt", category: ["cards"], maxBet: "6000" },
  { name: "Blackjack VIP", image: imgs.cards, provider: "Pragmatic", category: ["cards"], maxBet: "8000" },

  // FISHING
  { name: "Golden Fish", image: imgs.fishing, provider: "JDB", category: ["fishing"], maxBet: "5000" },
  { name: "Fishing War", image: imgs.fishing, provider: "Spadegaming", category: ["fishing"], maxBet: "3000" },
  { name: "Ocean King", image: imgs.fishing, provider: "JDB", category: ["fishing", "popular"], maxBet: "7000" },
  { name: "Mega Fishing", image: imgs.fishing, provider: "JDB", category: ["fishing"], maxBet: "4000" },
  { name: "All Star Fishing", image: imgs.fishing, provider: "JDB", category: ["fishing"], maxBet: "5000" },
  { name: "Dragon Fishing", image: imgs.fishing, provider: "Spadegaming", category: ["fishing"], maxBet: "6000" },
  { name: "Treasure Fishing", image: imgs.fishing, provider: "JDB", category: ["fishing"], maxBet: "3500" },
  { name: "Cai Shen Fishing", image: imgs.fishing, provider: "JDB", category: ["fishing"], maxBet: "4500" },
  { name: "Shark Hunt", image: imgs.fishing, provider: "Spadegaming", category: ["fishing"], maxBet: "8000" },
  { name: "Fish Hunt Pro", image: imgs.fishing, provider: "JDB", category: ["fishing"], maxBet: "5000" },

  // POPULAR
  { name: "Burning Hot", image: imgs.slots, provider: "EGT", category: ["popular", "slots"], maxBet: "5000" },
  { name: "Lucky Dice", image: imgs.dice, provider: "BGaming", category: ["popular", "slots"], maxBet: "3000" },
  { name: "Mines Gold", image: imgs.mines, provider: "SPRIBE", category: ["popular", "crash"], maxBet: "2000" },
  { name: "Starburst", image: imgs.wheel, provider: "NetEnt", category: ["popular", "slots"], maxBet: "2500" },
  { name: "Mega Moolah", image: imgs.dragon, provider: "Microgaming", category: ["popular", "slots"], maxBet: "6000" },
  { name: "Sweet Bonanza", image: imgs.wheel, provider: "Pragmatic", category: ["popular", "slots"], maxBet: "5000" },
  { name: "Book of Ra", image: imgs.dragon, provider: "Novomatic", category: ["popular", "slots"], maxBet: "5000" },
  { name: "Mega Fortune", image: imgs.wheel, provider: "NetEnt", category: ["popular", "slots"], maxBet: "8000" },
  { name: "Jackpot 6000", image: imgs.slots, provider: "NetEnt", category: ["popular", "slots"], maxBet: "6000" },
  { name: "Divine Fortune", image: imgs.dragon, provider: "NetEnt", category: ["popular", "slots"], maxBet: "5500" },
];

export const providers = [
  "All", "JILI", "PG", "SPRIBE", "Pragmatic", "FA CHAI", "JDB", "BNG",
  "Evolution", "SmartSoft", "Microgaming", "Spadegaming", "BT Gaming",
  "Yellow Bat", "EvoPlay", "Turbo Games", "BGaming",
];
