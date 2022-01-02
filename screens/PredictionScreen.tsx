import * as React from 'react';
import { useState } from 'react';
import {
  StyleSheet, View,
} from 'react-native';
import { Text } from '../components/Themed';
import { usePredictionData } from '../hooks/usePredictionData';

import { RootStackScreenProps } from '../types';

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  symbolText: {
    fontSize: 36,
    fontWeight: '300',
  },
});

export default function PredictionScreen({ route }: RootStackScreenProps<'Prediction'>) {
  const { symbol } = route.params;
  const [stock] = useState(symbol);
  const { data } = usePredictionData(stock);

  
  return (
    <View style={styles.container}>
      <Text style={styles.symbolText}>{symbol}</Text>
      {!!data ?
        <Text>{JSON.stringify(data)}</Text> :
        <Text>Loading...</Text>
      }
    </View>
  );
}
