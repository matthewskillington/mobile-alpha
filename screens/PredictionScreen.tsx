import * as React from 'react';
import { useState } from 'react';
import {
  StyleSheet, View,
} from 'react-native';
import { Text } from '../components/Themed';
import { getRecommendationHelper } from '../helpers/helper';
import { usePredictionData } from '../hooks/usePredictionData';

import { RootStackScreenProps } from '../types';

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  bodyWrapper: {
  },
  symbolText: {
    fontSize: 36,
    fontWeight: '300',
  },
  recommendationWrapper: {
    marginLeft: 20,
    padding: 6,
    borderRadius: 4,
  },
  bodyHeader: {
    marginBottom: 12,
    fontWeight: '700',
    fontSize: 18,
  },
  bodyItem: {
    marginVertical: 10,
  },
  recommendationText: {
    fontSize: 24,
    fontWeight: '300',
    color: '#FFF',
  },
  positive: {
    backgroundColor: '#39cc6d',
  },
  negative: {
    backgroundColor: '#ff5252',
  }
  
});

export default function PredictionScreen({ route }: RootStackScreenProps<'Prediction'>) {
  const { symbol } = route.params;
  const [stock] = useState(symbol);
  const { data } = usePredictionData(stock);

  if(data) {
    const recommendationHelper = getRecommendationHelper(data.recommendationMean);
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.symbolText}>{data.symbol}</Text>
          <View style={[styles.recommendationWrapper, data.recommendationMean < 2.9 ? styles.positive : styles.negative]}>
            <Text style={styles.recommendationText}>
              {`${data.recommendationMean} - ${recommendationHelper}`}
            </Text>
          </View>
        </View>
        <View style={styles.bodyWrapper}>
        <View style={styles.bodyItem}>
            <Text style={styles.bodyHeader}>Earnings per share</Text>
            <Text>{data.fwEps}</Text>
          </View>
          <View style={styles.bodyItem}>
            <Text style={styles.bodyHeader}>Company Summary</Text>
            <Text>{data.businessSummary}</Text>
          </View>
        </View>
      </View>
    );
  }
  return (
    <Text>Loading...</Text>
  );
}
