import { AntDesign } from '@expo/vector-icons';
import * as React from 'react';
import { useState } from 'react';
import { Button, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SearchComponent } from '../components/SearchComponent';

import { Text, View } from '../components/Themed';
import { PerformanceTracker } from '../performance/performance-tracker.component';
import { PerformanceTrackerScreenIds } from '../performance/types';
import { RootTabScreenProps } from '../types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    minHeight: 1000,
  },
  formWrapper: {
    marginVertical: 10,
  },
  headingWrapper: {
    flexDirection: 'row',
  },
  heading: {
    fontWeight: '300',
    fontSize: 20,
  },
  infoIcon: {
    marginRight: 10,
  },
  formBodyWrapper: {
    marginVertical: 10,
  },
  inputHeading: {
    fontSize: 20,
    marginVertical: 5,
    fontWeight: '300',
  },
});

export default function TabTwoScreen({ navigation }: RootTabScreenProps<'TabTwo'>) {
  const [selectedStock, setSelectedStock] = useState('');

  const handleSelectItem = (symbol: string) => {
    setSelectedStock(symbol);
  };

  return (
    <PerformanceTracker id={PerformanceTrackerScreenIds.PredictionsForm}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.formWrapper}>
            <View style={styles.headingWrapper}>
              <AntDesign name="infocirlce" size={20} color="#4c94d6" style={styles.infoIcon} />
              <Text style={styles.heading}>Fill in the form to create estimates</Text>
            </View>
            <View style={styles.formBodyWrapper}>
              <Text style={styles.inputHeading}>Select Stock</Text>
              <SearchComponent
                includeBorders
                setSelectedAsInputValue
                selectItem={handleSelectItem}
              />
              <Button
                onPress={() => navigation.navigate('Prediction', { symbol: selectedStock })}
                title="Submit"
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </PerformanceTracker>
  );
}
