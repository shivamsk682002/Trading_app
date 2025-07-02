export const fetchDailyData = async (symbol: string) => {
  try {
    const response = await fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&apikey=demo`
    );
    const json = await response.json();
    const timeSeries = json['Time Series (Daily)'];

    if (!timeSeries) return [];

    // Take the most recent 7 days
    const entries = Object.entries(timeSeries).slice(0, 7).reverse();

    return entries.map(([date, values]) => ({
      label: date.slice(5), // mm-dd
      value: parseFloat(values['4. close']),
    }));
  } catch (err) {
    console.error('Error fetching daily data:', err);
    return [];
  }
};
