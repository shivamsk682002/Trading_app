import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';

const stockInfo = () => {
  const route = useRoute();
  const { symbol } = route.params;

  const [stock, setStock] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false); // For Read More/Show Less

  const fetchStockDetails = async () => {
    try {
      const response = await fetch(
        `https://www.alphavantage.co/query?function=OVERVIEW&symbol=IBM&apikey=demo`
      );
      const data = await response.json();
      setStock(data);
    } catch (e) {
      console.error('Error fetching stock details:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStockDetails();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#000" />
      </SafeAreaView>
    );
  }

  if (!stock || Object.keys(stock).length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>No data available for this stock.</Text>
      </SafeAreaView>
    );
  }

  const todaysLow = 3169.85;
  const todaysHigh = 3218.10;

  const weekLow = parseFloat(stock["52WeekLow"]);
  const weekHigh = parseFloat(stock["52WeekHigh"]);

  const rangePercentage = (value) => {
    const min = weekLow;
    const max = weekHigh;
    if (max - min === 0) return 0;
    return ((value - min) / (max - min)) * 100;
  };

  const rangePercentageToday = (value) => {
    const min = todaysLow;
    const max = todaysHigh;
    if (max - min === 0) return 0;
    return ((value - min) / (max - min)) * 100;
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <View style={{ flex: 0.7 }}>
            <Text style={styles.stockName}>{stock.Name}</Text>
            <Text style={styles.stockMeta}>
              {stock.Symbol}, {stock.AssetType}
            </Text>
            <Text style={styles.stockMeta}>{stock.Exchange}</Text>
          </View>
          <View>
            <Text style={styles.stockPrice}>$177.4</Text>
            <Text style={styles.stockChange}>+1.23%</Text>
          </View>
        </View>

        <View style={styles.graphBox} />

        <View style={styles.card}>
          <Text style={styles.cardTitle}>About {stock.Name?.toUpperCase()}</Text>

          <Text style={styles.description}>
  {isExpanded
    ? stock.Description + ' '
    : stock.Description?.split(' ').slice(0, 40).join(' ') + '... '}
  <Text
    style={styles.readMore}
    onPress={() => setIsExpanded((prev) => !prev)}
  >
    {isExpanded ? 'Show less' : 'Read more'}
  </Text>
</Text>


          <View style={styles.tagRow}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Industry: {stock.Industry}</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Sector: {stock.Sector}</Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Performance</Text>

          <View style={styles.row}>
            <Text style={styles.label}>Today's low</Text>
            <Text style={styles.label}>Today's high</Text>
          </View>

          <View style={styles.barTrack}>
            <View
              style={[
                styles.marker,
                {
                  left: `${rangePercentageToday((todaysLow + todaysHigh) / 2)}%`,
                },
              ]}
            />
          </View>

          <View style={styles.row}>
            <Text style={styles.value}>{todaysLow}</Text>
            <Text style={styles.value}>{todaysHigh}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>52 Week low</Text>
            <Text style={styles.label}>52 Week high</Text>
          </View>

          <View style={styles.barTrack}>
            <View
              style={[
                styles.marker,
                {
                  left: `${rangePercentage(parseFloat(stock["200DayMovingAverage"]))}%`,
                  borderBottomColor: '#007bff',
                },
              ]}
            />
          </View>

          <View style={styles.row}>
            <Text style={styles.value}>{weekLow}</Text>
            <Text style={styles.value}>{weekHigh}</Text>
          </View>

          <View style={styles.statsGrid}>
            <View style={styles.statBlock}>
              <Text style={styles.label}>Open price</Text>
              <Text style={styles.value}>3,200.95</Text>
            </View>
            <View style={styles.statBlock}>
              <Text style={styles.label}>Prev. close</Text>
              <Text style={styles.value}>3,184.15</Text>
            </View>
            <View style={styles.statBlock}>
              <Text style={styles.label}>Volume</Text>
              <Text style={styles.value}>57,533</Text>
            </View>
            <View style={styles.statBlock}>
              <Text style={styles.label}>Lower circuit</Text>
              <Text style={styles.value}>2,865.75</Text>
            </View>
            <View style={styles.statBlock}>
              <Text style={styles.label}>Upper circuit</Text>
              <Text style={styles.value}>3,502.55</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default stockInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  stockName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  stockMeta: {
    color: '#666',
    fontSize: 12,
  },
  stockPrice: {
    fontWeight: 'bold',
    fontSize: 12,
  },
  stockChange: {
    color: '#4CAF50',
    fontSize: 12,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    fontSize: 16,
    marginTop: 40,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  graphBox: {
    height: 180,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: '#fff',
    marginVertical: 16,
    borderRadius: 8,
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 16,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 12,
  },
  description: {
    fontSize: 11,
    color: '#333',
    lineHeight: 20,
    marginBottom: 8,
  },
  readMore: {
    color: '#007bff',
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 12,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: '#fbd6c2',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    color: '#c85000',
    fontSize: 8,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  label: {
    color: '#888',
    fontSize: 13,
  },
  value: {
    fontWeight: '600',
    fontSize: 14,
  },
  barTrack: {
    height: 8,
    backgroundColor: '#eee',
    borderRadius: 4,
    marginVertical: 6,
    position: 'relative',
  },
  marker: {
    position: 'absolute',
    top: 4,
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderBottomWidth: 8,
    borderStyle: 'solid',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#444',
  },
  statsGrid: {
    marginTop: 12,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statBlock: {
    width: '48%',
    marginVertical: 6,
  },
});
