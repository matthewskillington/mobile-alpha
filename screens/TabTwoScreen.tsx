import { AntDesign } from '@expo/vector-icons';
import * as React from 'react';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { CustomInput } from '../components/CustomInput';

import { Text, View } from '../components/Themed';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
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
});

export default function TabTwoScreen() {
  const [test, setTest] = useState('');
  return (
    <View style={styles.container}>
      <View style={styles.formWrapper}>
        <View style={styles.headingWrapper}>
          <AntDesign name="infocirlce" size={20} color="#4c94d6" style={styles.infoIcon} />
          <Text style={styles.heading}>Fill in the form to create estimates</Text>
        </View>
        {/* <CustomInput
          label="Test"
          placeholder="myplaceholder"
          value={test}
          setValue={setTest}
        /> */}
      </View>
    </View>
  );
}
