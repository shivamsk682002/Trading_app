export type StockStackParamList = {
    Explore : undefined;
    ViewAll : {section : 'gainers' | 'losers'};
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