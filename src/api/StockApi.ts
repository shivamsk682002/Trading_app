// src/api/stockApi.ts

import ApiRoutes from "./ApiRoutes/ApiRoutes";

export const fetchStockOverview = async (ticker: string) => {
  const res = await fetch(
    ApiRoutes.getStockDetails(ticker)
   //'https://www.alphavantage.co/query?function=OVERVIEW&symbol=IBM&apikey=demo'
  );
  return await res.json();
};

export const fetchDailyChart = async (ticker: string) => {
  const res = await fetch(
    ApiRoutes.getGraph(ticker)
    //`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=demo`
  );
  return await res.json();
};

export const fetchSearchResults = async (keyword: string) => {
  const res = await fetch(
    ApiRoutes.getStocks(keyword)
    //"https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=tencent&apikey=demo"
  );
  return await res.json();
};