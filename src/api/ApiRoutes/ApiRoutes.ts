const ApiRoutes = {
  getStocks: (stock: String) =>
    `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${stock}&apikey=OCU9BBERF4T5AK3C`,

  gainersAndLooser:
    'https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=OCU9BBERF4T5AK3C',

  getGraph: (ticker: String) => `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&apikey=OCU9BBERF4T5AK3C`,
  getStockDetails: (ticker: String) => `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${ticker}&apikey=OCU9BBERF4T5AK3C`,
};
// 7E4F103YZVXHMUQE
// OCU9BBERF4T5AK3C
export default ApiRoutes;
