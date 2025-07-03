export type StockStackParamList = {
    Explore : undefined;
    ViewAll :{movers:string};
    Product : {symbol : string};
    Search : undefined;
    
}

export type WatchlistStackParamList = {
  WatchlistStocks: { watchlistName: string }
  Watchlist: undefined;
  Product: { symbol: string };
};

export type RootStackParamList = {
  MainTabs: undefined;
};
export type TickerData ={
  ticker: string;
  price: string;
  change_amount: string;
  change_percentage: string;
  volume: string;
}
export type StockOverview= {
  metadata: string;
  last_updated: string;
  top_gainers: TickerData[];
  top_losers: TickerData[];
  most_actively_traded: TickerData[];
}
