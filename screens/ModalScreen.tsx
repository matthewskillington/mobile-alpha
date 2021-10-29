import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Platform, StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { roundPercentage } from '../helpers/helper';
import { useStockData } from '../hooks/useStockData';
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
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

export default function ModalScreen({ route }: ModalScreenRouteProps) {
  const { symbol } = route.params;
  const { data } = useStockData([symbol]);

  if (data) {
    return (
      <View style={styles.container}>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>{symbol}</Text>
          <Text style={[styles.title, { marginLeft: 'auto' }]}>{roundPercentage(data[0].changePercentage)}</Text>
        </View>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <EditScreenInfo path="/screens/ModalScreen.tsx" />

        {/* Use a light status bar on iOS to account for the black space above the modal */}
        <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      </View>
    );
  }
  return (
    <Text>Loading...</Text>
  );
}
