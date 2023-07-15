import { User } from 'firebase/auth';
import React, { createContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../redux/hooks';
import { setUser } from '../redux/userSlice';
import { getLoginInfo } from '../storage/AsyncStorage';

type UserContextType = {
  user: User | undefined,
};

const UserContext = createContext<UserContextType>({
  user: undefined,
});

const UserProvider = (props: any) => {
  const { children } = props;
  const user = useAppSelector((state) => state.user.value);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkPersistedUser = async () => {
      const loginInfo = await getLoginInfo();
      if (loginInfo) {
        dispatch(setUser(loginInfo));
      }
    };
    checkPersistedUser();
  }, []);

  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
