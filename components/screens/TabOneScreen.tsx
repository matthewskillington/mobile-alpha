import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { StockTab } from '../StockTab/StockTab';

import { View } from '../Themed';
import { FAV_STOCKS } from '../../constants/Values';
import { PerformanceTracker } from '../../performance/performance-tracker.component';
import { PerformanceTrackerScreenIds } from '../../performance/types';
import { RootTabScreenProps } from '../../types';
import useUser from '../../hooks/useUser';
import { getFavStocksForUser } from '../../helpers/firebase-db-helper';

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
  const { user } = useUser();

  useEffect(() => {
    const getStocks = async () => {
      let combinedStocks = [];
      // Get data from firebase db if user logged in
      if (user) {
        const stocksFromFirebase = await getFavStocksForUser(user.user.uid);
        console.log(stocksFromFirebase);
        // combinedStocks.push(stocksFromFirebase);
      }

      const result = await AsyncStorage.getItem(FAV_STOCKS);
      if (result) {
        combinedStocks = JSON.parse(result);
      }
      setStocks(combinedStocks);
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
