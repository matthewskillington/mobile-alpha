import { UserCredential } from 'firebase/auth';
import React, { createContext, useState } from 'react';

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
