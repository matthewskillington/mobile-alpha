import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';
import { getLoginInfo } from '../storage/AsyncStorage';

const useUserPersistance = () => {
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
};

export { useUserPersistance };
