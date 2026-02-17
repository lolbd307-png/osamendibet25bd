import gameSlots from "@/assets/game-slots.jpg";
import gameRoulette from "@/assets/game-roulette.jpg";
import gameCrash from "@/assets/game-crash.jpg";
import gameCards from "@/assets/game-cards.jpg";
import gameSports from "@/assets/game-sports.jpg";
import gameDice from "@/assets/game-dice.jpg";
import gameFishing from "@/assets/game-fishing.jpg";
import gameWheel from "@/assets/game-wheel.jpg";

export interface Game {
  id: string;
  name: string;
  image: string;
  provider: string;
  category: string[];
  maxBet: string;
}

export const games: Game[] = [
  { id: "1", name: "Burning Hot", image: gameSlots, provider: "EGT", category: ["hot", "slots"], maxBet: "5000" },
  { id: "2", name: "Live Roulette", image: gameRoulette, provider: "Evolution", category: ["hot", "live"], maxBet: "10000" },
  { id: "3", name: "Crash Rocket", image: gameCrash, provider: "Spribe", category: ["hot", "crash"], maxBet: "2000" },
  { id: "4", name: "Blackjack VIP", image: gameCards, provider: "Pragmatic", category: ["hot", "cards"], maxBet: "8000" },
  { id: "5", name: "Football Bet", image: gameSports, provider: "Betradar", category: ["sports"], maxBet: "15000" },
  { id: "6", name: "Lucky Dice", image: gameDice, provider: "BGaming", category: ["hot", "slots"], maxBet: "3000" },
  { id: "7", name: "Golden Fish", image: gameFishing, provider: "JDB", category: ["fishing"], maxBet: "5000" },
  { id: "8", name: "Fortune Wheel", image: gameWheel, provider: "NetEnt", category: ["hot", "slots"], maxBet: "1000" },
  { id: "9", name: "Lucky Slot 777", image: gameSlots, provider: "Novomatic", category: ["slots", "popular"], maxBet: "4000" },
  { id: "10", name: "Dragon Tiger", image: gameCards, provider: "SA Gaming", category: ["live", "cards"], maxBet: "6000" },
  { id: "11", name: "Aviator", image: gameCrash, provider: "Spribe", category: ["hot", "crash", "popular"], maxBet: "5000" },
  { id: "12", name: "Cricket Bet", image: gameSports, provider: "BetRadar", category: ["sports", "popular"], maxBet: "20000" },
  { id: "13", name: "Baccarat", image: gameRoulette, provider: "Evolution", category: ["live", "cards", "popular"], maxBet: "10000" },
  { id: "14", name: "Fishing War", image: gameFishing, provider: "Spadegaming", category: ["fishing"], maxBet: "3000" },
  { id: "15", name: "Mega Wheel", image: gameWheel, provider: "Pragmatic", category: ["live", "popular"], maxBet: "8000" },
  { id: "16", name: "Fruit Bonanza", image: gameSlots, provider: "Play'n Go", category: ["slots"], maxBet: "2000" },
  { id: "17", name: "Hi-Lo Card", image: gameCards, provider: "Microgaming", category: ["cards"], maxBet: "1500" },
  { id: "18", name: "Dice Roll", image: gameDice, provider: "Hacksaw", category: ["slots", "popular"], maxBet: "3500" },
  { id: "19", name: "Speed Crash", image: gameCrash, provider: "Turbo Games", category: ["crash"], maxBet: "2500" },
  { id: "20", name: "Ocean King", image: gameFishing, provider: "JDB", category: ["fishing", "popular"], maxBet: "7000" },
  { id: "21", name: "Spin Wheel", image: gameWheel, provider: "Red Tiger", category: ["slots"], maxBet: "1500" },
  { id: "22", name: "Live Poker", image: gameCards, provider: "Evolution", category: ["live", "cards"], maxBet: "12000" },
  { id: "23", name: "Kabaddi Bet", image: gameSports, provider: "Betsoft", category: ["sports"], maxBet: "10000" },
  { id: "24", name: "Golden Dice", image: gameDice, provider: "EGT", category: ["slots", "hot"], maxBet: "4500" },
];
