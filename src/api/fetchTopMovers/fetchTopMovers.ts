import { TopMoversResponse } from "./types";
import ApiRoutes from "../ApiRoutes/ApiRoutes";

export const fetchTopMovers = async (): Promise<TopMoversResponse | null> => {
  try {
    const res = await fetch(ApiRoutes.gainersAndLooser);
    const data = await res.json();
    return data as TopMoversResponse;
  } catch (error) {
    console.error('Failed to fetch top movers:', error);
    return null;
  }
};
