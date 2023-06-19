import * as React from 'react';
import {
  Button, StyleSheet, Text,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {
  getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,
} from 'firebase/auth';
import { useState } from 'react';
import { CustomInput } from '../CustomInput';

import { View } from '../Themed';
import useUser from '../../../hooks/useUser';
import { deleteLoginInfo, saveLoginInfo } from '../../storage/AsyncStorage';

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
  signInWrapper: {
    alignItems: 'center',
    marginVertical: 50,
  },
  signInText: {
    marginTop: 10,
    color: '#297d96',
  },
});

export default function LoginScreen() {
  const auth = getAuth();
  const [signInState, setSignInState] = useState<'SignIn' | 'SignUp'>('SignUp');
  const [values, setValues] = useState({
    email: '',
    password: '',
    error: '',
  });

  const { user, setUser } = useUser();
  const isUserAuthenticated = !!user?.user.email;

  const signOut = () => {
    setUser(undefined);
    deleteLoginInfo();
  };

  const createUser = async () => {
    try {
      const createResult = await createUserWithEmailAndPassword(auth, values.email, values.password);
      setUser(createResult);
      saveLoginInfo(createResult);
    } catch (error: any) {
      setValues({
        email: '',
        password: '',
        error: error.message,
      });
    }
  };

  const signIn = async () => {
    try {
      const signInResult = await signInWithEmailAndPassword(auth, values.email, values.password);
      if (signInResult.user.refreshToken) {
        setUser(signInResult);
        saveLoginInfo(signInResult);
        return;
      }
      throw new Error('No refresh token');
    } catch (error: any) {
      setValues({
        email: '',
        password: '',
        error: error.message,
      });
    }
  };

  async function submitHandler() {
    if (values.email === '' || values.password === '') {
      setValues({
        email: '',
        password: '',
        error: 'Email and password are mandatory.',
      });
      return;
    }
    setValues({
      ...values,
      error: '',
    });
    if (signInState === 'SignUp') {
      createUser();
    } else {
      signIn();
    }
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        {isUserAuthenticated
          ? (
            <View>
              <Text style={styles.signUpHeading}>
                Hello
                {' '}
                {user?.user.email}
                !
              </Text>
              <Button
                onPress={() => signOut()}
                title="Sign out"
              />
            </View>
          )
          : (
            <View style={styles.signUpWrapper}>

              <Text style={styles.signUpHeading}>{signInState === 'SignUp' ? 'Sign Up' : 'Sign In'}</Text>
              <CustomInput
                label="Email"
                placeholder="something@somewhere.com"
                value={values.email}
                setValue={(text: string) => setValues({ ...values, email: text })}
              />
              <CustomInput
                label="Password"
                placeholder="password"
                value={values.password}
                setValue={(text: string) => setValues({ ...values, password: text })}
                secureTextEntry
              />

              {!!values.error && <View style={styles.error}><Text style={styles.errorText}>{values.error}</Text></View>}
              <Button
                onPress={() => submitHandler()}
                title="Submit"
              />
              <View style={styles.signInWrapper}>
                <Text>{signInState === 'SignUp' ? 'Already have an account?' : 'Not got an account?'}</Text>
                {signInState === 'SignUp' ? (
                  <Text
                    style={styles.signInText}
                    onPress={() => setSignInState('SignIn')}
                  >
                    Sign in
                  </Text>
                ) : (
                  <Text
                    style={styles.signInText}
                    onPress={() => setSignInState('SignUp')}
                  >
                    Sign up
                  </Text>
                )}

              </View>
            </View>
          )}

      </View>
    </ScrollView>
  );
}
