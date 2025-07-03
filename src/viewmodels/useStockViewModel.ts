// src/viewmodels/useStockViewModel.ts

import { useState, useEffect } from 'react';
import { fetchDailyChart, fetchStockOverview } from '../api/StockApi';
import { StockOverview,ChartPoint } from '../screens/StockInfo/type';
export const useStockViewModel = (ticker: string) => {
  const [loading, setLoading] = useState(true);
  const [stock, setStock] = useState<StockOverview | null>(null);
  const [chartData, setChartData] = useState<ChartPoint[]>([]);
  const [dailyMeta, setDailyMeta] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [overview, chart] = await Promise.all([
          fetchStockOverview(ticker),
          fetchDailyChart(ticker),
        ]);

        setStock(overview);

        const series = chart['Time Series (Daily)'];
        if (series) {
          const entries = Object.entries(series).slice(0, 7).reverse();
          const formatted = entries.map(([date, value]: any) => ({
            label: date.slice(5),
            value: parseFloat(value['4. close']),
          }));
          setChartData(formatted);

          const latestDates = Object.keys(series).slice(0, 2);
          const latest = series[latestDates[0]];
          const prev = series[latestDates[1]];

          setDailyMeta({
            open: parseFloat(latest['1. open']),
            high: parseFloat(latest['2. high']),
            low: parseFloat(latest['3. low']),
            close: parseFloat(latest['4. close']),
            volume: parseFloat(latest['5. volume']),
            prevClose: parseFloat(prev['4. close']),
          });
        }
      } catch (err) {
        console.error('ViewModel Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [ticker]);

  return {
    loading,
    stock,
    chartData,
    dailyMeta,
  };
};
