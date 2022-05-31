import React from 'react';
import {
  Text, StyleSheet, View, TextInput,
} from 'react-native';

export type CustomInputProps = {
  label: string,
  placeholder?: string,
  value: string,
  setValue: (text: any) => void,
};

const styles = StyleSheet.create({
  inputWrapper: {
    marginVertical: 10,
  },
  label: {
    fontSize: 20,
    fontWeight: '300',
  },
  textInput: {
    marginVertical: 10,
    fontSize: 20,
  },
});

const CustomInput = ({
  label,
  placeholder,
  value,
  setValue,
}: CustomInputProps) => (
  <View style={styles.inputWrapper}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={styles.textInput}
      placeholder={placeholder}
      value={value}
      onChangeText={(text: string) => setValue(text)}
    />
  </View>

);

export { CustomInput };
