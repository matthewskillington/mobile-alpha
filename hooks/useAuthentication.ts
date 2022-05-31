import React, { useEffect } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';

const auth = getAuth();

export default function useAuthentication() {
  const [user, setUser] = React.useState<User>();

  useEffect(() => {
    const unsubscribeFromAuthStatuChanged = onAuthStateChanged(auth, (_user) => {
      if (_user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setUser(_user);
      } else {
        // User is signed out
        setUser(undefined);
      }
    });

    return unsubscribeFromAuthStatuChanged;
  }, []);

  return {
    user,
  };
}
