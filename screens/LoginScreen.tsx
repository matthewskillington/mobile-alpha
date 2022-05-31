import * as React from 'react';
import {
  Button, StyleSheet, Text,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { CustomInput } from '../components/CustomInput';

import { View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { firebaseConfig } from '../config/firebase';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    minHeight: 1000,
  },
  signUpWrapper: {

  },
  signUpHeading: {
    fontSize: 20,
    marginBottom: 20,
  },
  error: {
    marginTop: 10,
    padding: 10,
    color: '#fff',
    backgroundColor: '#D54826FF',
  },
  errorText: {
    color: '#fff',
  },
});

initializeApp(firebaseConfig);

const auth = getAuth();

export default function LoginScreen({ navigation }: RootTabScreenProps<'TabThree'>) {
  const [signUpValues, setSignUpValues] = React.useState({
    email: '',
    password: '',
    error: '',
  });

  async function signUp() {
    if (signUpValues.email === '' || signUpValues.password === '') {
      setSignUpValues({
        ...signUpValues,
        error: 'Email and password are mandatory.',
      });
      return;
    }

    setSignUpValues({
      ...signUpValues,
      error: '',
    });
    try {
      await createUserWithEmailAndPassword(auth, signUpValues.email, signUpValues.password);
      console.log('User created');
    } catch (error: any) {
      setSignUpValues({
        ...signUpValues,
        error: error.message,
      });
      console.log('Error creating user: ', error);
    }
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.signUpWrapper}>
          <Text style={styles.signUpHeading}>Sign Up</Text>
          <CustomInput
            label="Email"
            placeholder="something@somewhere.com"
            value={signUpValues.email}
            setValue={(text: string) => setSignUpValues({ ...signUpValues, email: text })}
          />
          <CustomInput
            label="Password"
            placeholder="password"
            value={signUpValues.password}
            setValue={(text: string) => setSignUpValues({ ...signUpValues, password: text })}
          />

          {!!signUpValues.error && <View style={styles.error}><Text style={styles.errorText}>{signUpValues.error}</Text></View>}
          <Button
            onPress={() => signUp()}
            title="Submit"
          />
        </View>
      </View>
    </ScrollView>
  );
}
