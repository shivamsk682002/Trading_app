import React, { useRef, useState } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { BookmarkIcon } from 'react-native-heroicons/outline';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import BottomTabModal, { BottomTabModalRef } from './watchlistBottomsheet';
import { LineChart } from 'react-native-chart-kit';
import { StockInfoSkeleton } from './StockInfoSkeleton';
import FundamentalsSection from './Fundamentals';
import { useStockViewModel } from '../../viewmodels/useStockViewModel';
import { styles } from './styles';
import colors from '../../utils/colors';

const StockInfo = () => {
  const screenWidth = Dimensions.get('window').width;
  const route = useRoute();
  const { ticker } = route.params;
  const [isExpanded, setIsExpanded] = useState(false);

  const { loading, stock, chartData, dailyMeta } = useStockViewModel(ticker);
  const modalRef = useRef<BottomTabModalRef>(null);
  const openModal = () => modalRef.current?.open();
  const navigation = useNavigation();

  if (loading) return <StockInfoSkeleton />;
  if (!stock || !dailyMeta) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>No data available for this stock.</Text>
      </SafeAreaView>
    );
  }

  const weekLow = parseFloat(stock["52WeekLow"]);
  const weekHigh = parseFloat(stock["52WeekHigh"]);

  const rangePercentage = (value: number, min: number, max: number) => {
    if (max - min === 0) return 0;
    return ((value - min) / (max - min)) * 100;
  };

  const dailyChange = dailyMeta.close - dailyMeta.prevClose;
  const dailyChangePercent = ((dailyChange / dailyMeta.prevClose) * 100).toFixed(2);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.fixedHeader}>
        <View style={styles.rowGap}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeftIcon />
          </TouchableOpacity>
          <Text style={styles.headerText}>Details Screen</Text>
        </View>
        <TouchableOpacity onPress={openModal}>
          <BookmarkIcon size={24} color="black" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollContent}>
        <View style={styles.headerRow}>
          <View style={styles.flex70}>
            <Text style={styles.stockName}>{stock.Name}</Text>
            <Text style={styles.stockMeta}>{stock.Symbol}, {stock.AssetType}</Text>
            <Text style={styles.stockMeta}>{stock.Exchange}</Text>
          </View>
          <View>
            <Text style={styles.stockPrice}>{dailyMeta.close.toFixed(2)}</Text>
            <Text style={[
              styles.stockChange,
              { color: dailyChange >= 0 ? styles.green.color : styles.red.color }
            ]}>
              {dailyChange >= 0 ? '+' : ''}{dailyChangePercent}%
            </Text>
          </View>
        </View>

        <View style={styles.graphBox}>
          {chartData.length > 0 ? (
            <LineChart
              data={{
                labels: chartData.map((d, i) => (i % 3 === 0 ? d.label : '')),
                datasets: [{
                  data: chartData.map((d) => d.value),
                  color: () => colors.green,
                  strokeWidth: 2,
                }],
              }}
              width={screenWidth - 40}
              height={180}
              withInnerLines={false}
              withOuterLines={true}
              withDots={false}
              withShadow={false}
              bezier
              chartConfig={{
                backgroundGradientFrom: colors.white,
                backgroundGradientTo: colors.white,
                decimalPlaces: 2,
                color: () => colors.green,
                labelColor: () => colors.emptyGray,
                style: { borderRadius: 8 },
                propsForLabels: { fontSize: 10 },
              }}
              style={styles.chart}
            />
          ) : (
            <Text style={styles.loadingChart}>Loading chart...</Text>
          )}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>About {stock.Name?.toUpperCase()}</Text>
          <Text style={styles.description}>
            {isExpanded
              ? stock.Description + ' '
              : stock.Description?.split(' ').slice(0, 20).join(' ') + '... '}
            <Text style={styles.readMore} onPress={() => setIsExpanded(prev => !prev)}>
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
            <Text style={styles.label}>52 Week low</Text>
            <Text style={styles.label}>52 Week high</Text>
          </View>
          <View style={styles.barTrack}>
            <View style={[
              styles.marker,
              {
                left: `${rangePercentage(dailyMeta.close, weekLow, weekHigh)}%`,
                borderBottomColor: '#007bff',
              }
            ]} />
          </View>
          <View style={styles.row}>
            <Text style={styles.value}>{weekLow}</Text>
            <Text style={styles.value}>{weekHigh}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Today's low</Text>
            <Text style={styles.label}>Today's high</Text>
          </View>
          <View style={styles.barTrack}>
            <View style={[
              styles.marker,
              {
                left: `${rangePercentage(dailyMeta.close, dailyMeta.low, dailyMeta.high)}%`,
                borderBottomColor: '#e67e22',
              }
            ]} />
          </View>
          <View style={styles.row}>
            <Text style={styles.value}>{dailyMeta.low}</Text>
            <Text style={styles.value}>{dailyMeta.high}</Text>
          </View>

          <View style={styles.statsGrid}>
            <View style={styles.statBlock}>
              <Text style={styles.label}>Open price</Text>
              <Text style={styles.value}>{dailyMeta.open}</Text>
            </View>
            <View style={styles.statBlock}>
              <Text style={styles.label}>Prev. close</Text>
              <Text style={styles.value}>{dailyMeta.prevClose}</Text>
            </View>
            <View style={styles.statBlock}>
              <Text style={styles.label}>Volume</Text>
              <Text style={styles.value}>{dailyMeta.volume}</Text>
            </View>
          </View>
        </View>

        <FundamentalsSection stock={stock} />
      </ScrollView>

      <BottomTabModal
        ref={modalRef}
        stockName={stock.Name}
        stockSymbol={stock.Symbol}
        price={dailyMeta.close}
      />
    </SafeAreaView>
  );
};

export default StockInfo;
