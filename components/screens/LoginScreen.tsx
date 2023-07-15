import * as React from 'react';
import {
  Button, StyleSheet, Text,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {
  getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,
} from 'firebase/auth';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { CustomInput } from '../CustomInput';

import { View } from '../Themed';
import { deleteLoginInfo, saveLoginInfo } from '../../storage/AsyncStorage';
import { useAppSelector } from '../../redux/hooks';
import { setUser } from '../../redux/userSlice';

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

  const user = useAppSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const isUserAuthenticated = !!user?.email;

  const signOut = () => {
    dispatch(setUser(undefined));
    deleteLoginInfo();
  };

  const createUser = async () => {
    try {
      const createResult = await createUserWithEmailAndPassword(auth, values.email, values.password);
      dispatch(setUser(createResult.user));
      saveLoginInfo(createResult.user);
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
        dispatch(setUser(signInResult.user));
        saveLoginInfo(signInResult.user);
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
                {user?.email}
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
