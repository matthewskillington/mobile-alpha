import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from './Themed';

const styles = StyleSheet.create({
  bodyHeader: {
    marginBottom: 12,
    fontWeight: '700',
    fontSize: 18,
  },
  bodyItem: {
    marginVertical: 10,
  },
  positive: {
    color: '#39cc6d',
  },
  negative: {
    color: '#ff5252',
  },
  caution: {
    color: '#f5b342',
  },
  metricText: {
    fontSize: 18,
  },
});

export type TechnicalIndicatorWarning = 'positive' | 'caution' | 'negative';

type TechnicalIndicatorProps = {
  label: string,
  metricData: string | number,
  warning?: TechnicalIndicatorWarning | undefined,
  isNumber?: boolean
};

const getWarningStyle = (warning: TechnicalIndicatorWarning | undefined) => {
  if (warning === 'positive') {
    return styles.positive;
  }
  if (warning === 'caution') {
    return styles.caution;
  }
  if (warning === 'negative') {
    return styles.negative;
  }
  return null;
};

const TechnicalIndicator = ({
  label, metricData, warning, isNumber,
}: TechnicalIndicatorProps) => {
  const warningStyle = getWarningStyle(warning);
  return (
    metricData
      ? (
        <View style={styles.bodyItem}>
          <Text style={styles.bodyHeader}>{label}</Text>
          <Text style={[styles.metricText, warningStyle, isNumber ? { fontWeight: 'bold' } : null]}>{metricData}</Text>
        </View>
      ) : null);
};

TechnicalIndicator.defaultProps = {
  warning: undefined,
  isNumber: false,
};

export { TechnicalIndicator };
