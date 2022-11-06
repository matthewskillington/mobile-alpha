import { UserCredential } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { getLoginInfo } from '../storage/AsyncStorage';

type UserContextType = {
  user: UserCredential | undefined,
  setUser: (user: UserCredential | undefined) => void,
};

const UserContext = createContext<UserContextType>({
  user: undefined,
  setUser: () => {},
});

const UserProvider = (props: any) => {
  const { children } = props;
  const [userState, setUserState] = useState<UserCredential | undefined>();

  useEffect(() => {
    const checkPersistedUser = async () => {
      const loginInfo = await getLoginInfo();
      if (loginInfo) {
        setUserState(loginInfo);
      }
    };
    checkPersistedUser();
  }, []);

  const setUser = (user: UserCredential | undefined) => {
    setUserState(user);
  };

  return (
    <UserContext.Provider value={{ user: userState, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
