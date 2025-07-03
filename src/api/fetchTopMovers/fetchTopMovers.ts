import { TopMoversResponse } from "./types";
import ApiRoutes from "../ApiRoutes/ApiRoutes";

export const fetchTopMovers = async (): Promise<TopMoversResponse | null> => {
  try {
    console.log("fetching")
    const res = await fetch(
       ApiRoutes.gainersAndLooser
      //'https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=demo'
    );
    const data = await res.json();
    return data as TopMoversResponse;
  } catch (error) {
    console.error('Failed to fetch top movers:', error);
    return null;
  }
};
