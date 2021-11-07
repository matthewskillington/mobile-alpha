import * as React from 'react';
import { useState } from 'react';
import { Dimensions, StyleSheet, useColorScheme } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { AbstractChartConfig } from 'react-native-chart-kit/dist/AbstractChart';

import { Text, View } from '../components/Themed';
import { useGraphData } from '../hooks/useGraphData';
import { ModalScreenRouteProps } from '../types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  titleWrapper: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  graphWrapper: {
    flex: 1,
    width: '100%',
  },
});

const getChartConfig = (theme: 'light' | 'dark'): AbstractChartConfig => {
  if (theme === 'light') {
    return {
      backgroundGradientFrom: '#1E2923',
      backgroundGradientFromOpacity: 0,
      backgroundGradientTo: '#fff',
      backgroundGradientToOpacity: 0,
      color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
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
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    barPercentage: 0.5,
    useShadowColorFromDataset: true,
  };
};

const screenWidth = Dimensions.get('window').width;

export default function ModalScreen({ route }: ModalScreenRouteProps) {
  const theme = useColorScheme();
  const { symbol } = route.params;
  const [stock] = useState(symbol);
  const { data } = useGraphData(stock);

  if (data && theme) {
    return (
      <View style={styles.container}>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>{symbol}</Text>
          <Text style={[styles.title, { marginLeft: 'auto' }]}>{/* roundPercentage(data[0].changePercentage) */}</Text>
        </View>
        <View style={styles.graphWrapper}>
          <LineChart
            data={data}
            width={screenWidth}
            height={700}
            chartConfig={getChartConfig(theme)}
            bezier
          />
        </View>
      </View>
    );
  }
  return (
    <Text>Loading...</Text>
  );
}
