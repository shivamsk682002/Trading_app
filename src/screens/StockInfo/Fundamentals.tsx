// FundamentalsSection.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { styles } from './styles';
import { StockFundamentals } from './type';

interface Props {
  stock: StockFundamentals;
}

const formatValue = (label: string, value: string | number) => {
  if (label.includes('Yield') || label.includes('Margin') || label.includes('ROE')) {
    return `${(parseFloat(value as string) * 100).toFixed(2)}%`;
  }
  if (!isNaN(Number(value))) {
    const num = Number(value);
    if (num > 1e9) return `${(num / 1e9).toFixed(2)}B`;
    if (num > 1e6) return `${(num / 1e6).toFixed(2)}M`;
  }
  return value;
};

const FundamentalsSection = ({ stock}:Props) => {
  const data = [
    ['Market Cap', stock.MarketCapitalization],
    ['P/E Ratio', stock.PERatio],
    ['P/B Ratio', stock.PriceToBookRatio],
    ['EPS', stock.EPS],
    ['Dividend Yield', stock.DividendYield],
    ['ROE', stock.ReturnOnEquityTTM],
    ['Profit Margin', stock.ProfitMargin],
    ['Revenue', stock.RevenueTTM],
    ['Gross Profit', stock.GrossProfitTTM],
    ['Book Value', stock.BookValue],
  ];

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Fundamentals</Text>
      <View style={styles.grid}>
        {data.map(([label, value]) => (
          <View style={styles.item} key={label}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.value}>{formatValue(label, value)}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};




export default FundamentalsSection;
