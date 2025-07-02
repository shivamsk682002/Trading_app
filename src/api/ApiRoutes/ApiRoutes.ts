const ApiRoutes = {
  getStocks: (stock:String) =>
    `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${stock}&apikey=I2ZBQQ4MDD96P60J`,
   gainersAndLooser:'https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=7E4F103YZVXHMUQE'
};
// 7E4F103YZVXHMUQE
// OCU9BBERF4T5AK3C
export default ApiRoutes;
