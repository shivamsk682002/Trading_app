const ApiRoutes = {
  getStocks: (stock:String) =>
    `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${stock}&apikey=I2ZBQQ4MDD96P60J`,
};
// 7E4F103YZVXHMUQE
// OCU9BBERF4T5AK3C
export default ApiRoutes;
