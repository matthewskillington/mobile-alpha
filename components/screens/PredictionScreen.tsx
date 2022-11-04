import * as React from 'react';
import { useState } from 'react';
import {
  ScrollView,
  StyleSheet, View,
} from 'react-native';
import { TechnicalIndicator, TechnicalIndicatorWarning } from '../TechnicalIndicator';
import { Text } from '../Themed';
import { getRecommendationHelper } from '../../helpers/helper';
import { usePredictionData } from '../../hooks/usePredictionData';
import { PerformanceTracker } from '../../performance/performance-tracker.component';
import { PerformanceTrackerScreenIds } from '../../performance/types';

import { RootStackScreenProps } from '../../types';

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
  },

});

const getEpsWarning = (eps: number): TechnicalIndicatorWarning => {
  if (eps < 2) {
    return 'negative';
  }
  if (eps < 10) {
    return 'caution';
  }
  return 'positive';
};

const getEvToEbitdaWarning = (evToEbitda: number): TechnicalIndicatorWarning => {
  if (evToEbitda > 1 && evToEbitda < 18) {
    return 'positive';
  }
  if (evToEbitda >= 18) {
    return 'caution';
  }
  return 'negative';
};

export default function PredictionScreen({ route }: RootStackScreenProps<'Prediction'>) {
  const { symbol } = route.params;
  const [stock] = useState(symbol);
  const { data } = usePredictionData(stock);

  if (data) {
    const recommendationHelper = getRecommendationHelper(data.recommendationMean);
    return (
      <PerformanceTracker id={PerformanceTrackerScreenIds.PredictionResult}>
        <ScrollView style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.symbolText}>{data.symbol}</Text>
            <View style={[styles.recommendationWrapper, data.recommendationMean < 2.9 ? styles.positive : styles.negative]}>
              <Text style={styles.recommendationText}>
                {`${data.recommendationMean} - ${recommendationHelper}`}
              </Text>
            </View>
          </View>
          <View style={styles.bodyWrapper}>
            <TechnicalIndicator
              label="Earnings per share"
              metricData={data.fwEps}
              warning={getEpsWarning(data.fwEps)}
              isNumber
            />
            <TechnicalIndicator
              label="Enterprise value to EBITDA"
              metricData={data.evToEbitda}
              warning={getEvToEbitdaWarning(data.evToEbitda)}
              isNumber
            />
            <TechnicalIndicator
              label="Enterprise value to revenue"
              metricData={data.evToRevenue}
              isNumber
            />
            <TechnicalIndicator
              label="Company Summary"
              metricData={data.businessSummary}
            />
          </View>
        </ScrollView>
      </PerformanceTracker>
    );
  }
  return (
    <Text>Loading...</Text>
  );
}
