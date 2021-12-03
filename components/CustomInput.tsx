import React, { Dispatch } from 'react';
import {
  Text, StyleSheet, View, TextInput,
} from 'react-native';

export type CustomInputProps = {
  label: string,
  placeholder?: string,
  value: string,
  setValue: Dispatch<React.SetStateAction<string>>
};

const styles = StyleSheet.create({
  inputWrapper: {
    marginVertical: 20,
  },
  label: {
    fontSize: 20,
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
