import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { BookmarkIcon } from 'react-native-heroicons/outline';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import BottomTabModal, { BottomTabModalRef } from './watchlistBottomsheet';
import { LineChart } from 'react-native-chart-kit';

const stockInfo = () => {
  const screenWidth = Dimensions.get('window').width;
  const route = useRoute();
  const { symbol } = route.params;

  const [stock, setStock] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [chartData, setChartData] = useState([]);

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

  const fetchChartData = async () => {
    try {
      const res = await fetch(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=demo`
      );
      const raw = await res.json();
      const series = raw['Time Series (Daily)'];
      if (series) {
        const formatted = Object.entries(series)
          .slice(0, 7)
          .reverse()
          .map(([date, value]) => ({
            label: date.slice(5),
            value: parseFloat(value['4. close']),
          }));
        setChartData(formatted);
      }
    } catch (err) {
      console.error('Chart fetch error:', err);
    }
  };

  useEffect(() => {
    fetchStockDetails();
    fetchChartData();
  }, []);

  const modalRef = useRef<BottomTabModalRef>(null);

  const openModal = () => {
    modalRef.current?.open();
  };

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
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.fixedHeader}>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <TouchableOpacity onPress={()=>{navigation.goBack()}}>
          <ArrowLeftIcon />
          </TouchableOpacity>
          <Text style={styles.headerText}>Details Screen</Text>
        </View>
        <TouchableOpacity onPress={openModal}>
          <BookmarkIcon size={24} color="black" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: 16, paddingTop: 12 }}>
        <View style={styles.headerRow}>
          <View style={{ flex: 0.7 }}>
            <Text style={styles.stockName}>{stock.Name}</Text>
            <Text style={styles.stockMeta}>{stock.Symbol}, {stock.AssetType}</Text>
            <Text style={styles.stockMeta}>{stock.Exchange}</Text>
          </View>
          <View>
            <Text style={styles.stockPrice}>$177.4</Text>
            <Text style={styles.stockChange}>+1.23%</Text>
          </View>
        </View>

        <View style={styles.graphBox}>
          {chartData.length > 0 ? (
            <LineChart
              data={{
                labels: chartData.map((d, i) => (i % 3 === 0 ? d.label : '')), // fewer labels
                datasets: [
                  {
                    data: chartData.map(d => d.value),
                    color: () => '#00B386',
                    strokeWidth: 2,
                  },
                ],
              }}
              width={screenWidth - 40}
              height={180}
              withInnerLines={false}
              withOuterLines={true}
              withDots={false}
              withShadow={false}
              bezier
              chartConfig={{
                backgroundGradientFrom: '#fff',
                backgroundGradientTo: '#fff',
                decimalPlaces: 2,
                color: () => '#00B386',
                labelColor: () => '#888',
                style: {
                  borderRadius: 8,
                },
                propsForLabels: {
                  fontSize: 10,
                },
              }}
              style={{ borderRadius: 8 }}
            />

          ) : (
            <Text style={{ textAlign: 'center', padding: 20 }}>Loading chart...</Text>
          )}
        </View>


        <View style={styles.card}>
          <Text style={styles.cardTitle}>About {stock.Name?.toUpperCase()}</Text>
          <Text style={styles.description}>
            {isExpanded
              ? stock.Description + ' '
              : stock.Description?.split(' ').slice(0, 40).join(' ') + '... '}
            <Text style={styles.readMore} onPress={() => setIsExpanded((prev) => !prev)}>
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

      <BottomTabModal
        ref={modalRef}
        stockName={stock.Name}
        stockSymbol={stock.Symbol}
        price={177}
      />
    </SafeAreaView>
  );
};

export default stockInfo;

const styles = StyleSheet.create({
  fixedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    paddingVertical: 8,
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    height: 200,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: '#fff',
    marginVertical: 16,
    borderRadius: 8,
    justifyContent: 'center',
    paddingLeft: -20
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
