import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchTopMovers } from "../api/fetchTopMovers/fetchTopMovers";
import { saveTopMovers } from "../storage/asyncStorage";


const ONE_DAY_MS = 24 * 60 * 60 * 1000;

export const scheduleTopMoversUpdate = async () => {
  const lastUpdate = await AsyncStorage.getItem('LAST_UPDATE_TIMESTAMP');
  const now = Date.now();

  if (!lastUpdate || now - parseInt(lastUpdate) > ONE_DAY_MS|| parseInt(lastUpdate) <60*60) {
    console.log(lastUpdate);
    const data = await fetchTopMovers();
    if (data) {
      await saveTopMovers(data);
      await AsyncStorage.setItem('LAST_UPDATE_TIMESTAMP', now.toString());
    }
  }
};
