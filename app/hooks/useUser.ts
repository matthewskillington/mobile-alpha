import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

export default function useUser() {
  const { user, setUser } = useContext(UserContext);
  return {
    user,
    setUser,
  };
}
