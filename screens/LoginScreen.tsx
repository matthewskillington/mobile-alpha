import * as React from 'react';
import {
  Button, StyleSheet, Text,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {
  getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,
} from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { useState } from 'react';
import { CustomInput } from '../components/CustomInput';

import { View } from '../components/Themed';
import { firebaseConfig } from '../config/firebase';
import useUser from '../hooks/useUser';

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

initializeApp(firebaseConfig);

const auth = getAuth();

export default function LoginScreen() {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState<Boolean>(false);
  const [signInState, setSignInState] = useState<'SignIn' | 'SignUp'>('SignUp');
  const [values, setValues] = useState({
    email: '',
    password: '',
    error: '',
  });

  const { user, setUser } = useUser();

  const signOut = () => {
    setIsUserAuthenticated(false);
    setUser(undefined);
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
      try {
        const createResult = await createUserWithEmailAndPassword(auth, values.email, values.password);
        setIsUserAuthenticated(true);
        setUser(createResult);
      } catch (error: any) {
        setValues({
          email: '',
          password: '',
          error: error.message,
        });
        console.log('Error creating user: ', error);
      }
    } else {
      try {
        const signInResult = await signInWithEmailAndPassword(auth, values.email, values.password);
        if (signInResult.user.refreshToken) {
          setIsUserAuthenticated(true);
          setUser(signInResult);
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
