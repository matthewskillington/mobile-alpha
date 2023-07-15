import { createSlice } from '@reduxjs/toolkit';
import { User } from 'firebase/auth';

const initialState: { value: User | undefined } = {
  value: undefined,
};

/* eslint-disable no-param-reassign */
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
