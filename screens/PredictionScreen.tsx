import * as React from 'react';
import {
  StyleSheet, View,
} from 'react-native';
import { Text } from '../components/Themed';

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
  return (
    <View style={styles.container}>
      <Text style={styles.symbolText}>{symbol}</Text>
    </View>
  );
}
