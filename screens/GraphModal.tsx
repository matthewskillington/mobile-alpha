import * as React from 'react';
import { useState } from 'react';
import { Dimensions, StyleSheet, useColorScheme } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { AbstractChartConfig } from 'react-native-chart-kit/dist/AbstractChart';

import { Text, View } from '../components/Themed';
import { getCurrencySymbolFromStockSymbol, roundPercentage } from '../helpers/helper';
import { TimeSpanOptions, useGraphData } from '../hooks/useGraphData';
import { PerformanceTracker } from '../performance/performance-tracker.component';
import { PerformanceTrackerScreenIds } from '../performance/types';
import { GraphModalRouteProps } from '../types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
  },
  titleWrapper: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  graphWrapper: {
    flex: 1,
    width: '100%',
  },
  optionWrapper: {
    flexDirection: 'row',
    paddingBottom: 20,
  },
  timeOptions: {
    textAlign: 'center',
    flex: 1,
  },
  selectedOption: {
    color: '#8641f4',
    fontWeight: 'bold',
  },
});

const getChartConfig = (theme: 'light' | 'dark'): AbstractChartConfig => {
  if (theme === 'light') {
    return {
      backgroundGradientFrom: '#1E2923',
      backgroundGradientFromOpacity: 0,
      backgroundGradientTo: '#fff',
      backgroundGradientToOpacity: 0,
      color: (opacity = 1) => `rgba(133, 133, 133, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
      barPercentage: 0.5,
      useShadowColorFromDataset: true,
    };
  }
  return {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#fff',
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(133, 133, 133, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    barPercentage: 0.5,
    useShadowColorFromDataset: true,
  };
};

const screenWidth = Dimensions.get('window').width;

const getPercentageFromGraphData = (data: number[]): { percentageString: string, isPositiveChange: boolean } => {
  const firstValue = data[0];
  const lastValue = data[data.length - 1];
  const percentageString = `${((lastValue / firstValue) * 100) - 100}%`;
  const isPositiveChange = percentageString.substr(0, 1) !== '-';
  return { percentageString, isPositiveChange };
};

export default function GraphModal({ route }: GraphModalRouteProps) {
  const [timeOption, setTimeOption] = useState<TimeSpanOptions>(TimeSpanOptions.OneYear);
  const theme = useColorScheme();
  const { symbol } = route.params;
  const [stock] = useState(symbol);
  const { data } = useGraphData(stock);

  if (data && theme) {
    const { percentageString, isPositiveChange } = getPercentageFromGraphData(data?.datasets[0].data);
    return (
      <PerformanceTracker id={PerformanceTrackerScreenIds.StockGraph}>
        <View style={styles.container}>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>{symbol}</Text>
            <Text style={[styles.title, { textAlign: 'right' }, isPositiveChange ? { color: '#39cc6d' } : { color: '#ff5252' }]}>{ roundPercentage(percentageString) }</Text>
          </View>
          <View style={styles.optionWrapper}>
            <Text
              style={[styles.timeOptions, timeOption === TimeSpanOptions.ThreeMonth ? styles.selectedOption : null]}
              onPress={() => setTimeOption(TimeSpanOptions.ThreeMonth)}
            >
              {' '}
              3m
              {' '}

            </Text>
            <Text style={styles.timeOptions}> | </Text>
            <Text
              style={[styles.timeOptions, timeOption === TimeSpanOptions.SixMonth ? styles.selectedOption : null]}
              onPress={() => setTimeOption(TimeSpanOptions.SixMonth)}
            >
              {' '}
              6m
              {' '}

            </Text>
            <Text style={styles.timeOptions}> | </Text>
            <Text
              style={[styles.timeOptions, timeOption === TimeSpanOptions.OneYear ? styles.selectedOption : null]}
              onPress={() => setTimeOption(TimeSpanOptions.OneYear)}
            >
              {' '}
              12m
              {' '}

            </Text>
            <Text style={styles.timeOptions}> | </Text>
            <Text
              style={[styles.timeOptions, timeOption === TimeSpanOptions.ThreeYear ? styles.selectedOption : null]}
              onPress={() => setTimeOption(TimeSpanOptions.ThreeYear)}
            >
              {' '}
              3y
              {' '}

            </Text>
            <Text style={styles.timeOptions}> | </Text>
            <Text
              style={[styles.timeOptions, timeOption === TimeSpanOptions.FiveYear ? styles.selectedOption : null]}
              onPress={() => setTimeOption(TimeSpanOptions.FiveYear)}
            >
              {' '}
              5y
              {' '}

            </Text>
          </View>
          <View style={styles.graphWrapper}>
            <LineChart
              data={data}
              width={screenWidth}
              height={700}
              chartConfig={getChartConfig(theme)}
              yAxisLabel={getCurrencySymbolFromStockSymbol(symbol)}
              bezier
            />
          </View>
        </View>
      </PerformanceTracker>
    );
  }
  return (
    <Text>Loading...</Text>
  );
}
