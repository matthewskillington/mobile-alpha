import * as React from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { StockTab } from '../StockTab/StockTab';

import { View } from '../Themed';
import { PerformanceTracker } from '../../../performance/performance-tracker.component';
import { PerformanceTrackerScreenIds } from '../../../performance/types';
import { RootTabScreenProps } from '../../../types';

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
  return (
    <PerformanceTracker id={PerformanceTrackerScreenIds.Overview}>
      <ScrollView>
        <View style={styles.container}>
          <StockTab
            title="Market data"
            navigation={navigation}
          />
        </View>
      </ScrollView>
    </PerformanceTracker>
  );
}
