import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { StockTab } from '../components/StockTab';

import { View } from '../components/Themed';
import { FAV_STOCKS } from '../constants/Values';
import { PerformanceTracker } from '../performance/performance-tracker.component';
import { PerformanceTrackerScreenIds } from '../performance/types';
import { RootTabScreenProps } from '../types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10,
    minHeight: 1000,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    const getStocks = async () => {
      //* TODO: Remove, temporarily add some data until feature fully implemented */
      const jsonValue = JSON.stringify(['IDEA.LON', 'AUTO.LON']);
      await AsyncStorage.setItem(FAV_STOCKS, jsonValue);

      const result = await AsyncStorage.getItem(FAV_STOCKS);
      const jsonResult = result ? JSON.parse(result) : [];
      setStocks(jsonResult);
    };

    getStocks();
  }, []);

  return (
    <PerformanceTracker id={PerformanceTrackerScreenIds.Overview}>
      <ScrollView>
        <View style={styles.container}>
          {stocks.length >= 1
            ? (
              <StockTab
                title="Market data"
                stocks={stocks}
                navigation={navigation}
              />
            )
            : <Text>Loading...</Text>}
        </View>
      </ScrollView>
    </PerformanceTracker>
  );
}
