export interface Stock {
  ticker: string;
  price: string;
  change_amount: string;
  change_percentage: string;
  volume: string;
}

export interface TopMoversResponse {
  metadata: string;
  last_updated: string;
  top_gainers: Stock[];
  top_losers: Stock[];
  most_actively_traded: Stock[];
}
export type WatchlistStock = {
  symbol: string;
  name: string;
  price: number;
};

export type Watchlist = {
  name: string; 
  stocks: WatchlistStock[];
};

export type WatchlistData = Watchlist[];

