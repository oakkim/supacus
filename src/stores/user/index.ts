/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@supabase/supabase-js';

export type UserState = {
  loggedIn: boolean;
  user: User|null;
}
  
const initialState: UserState = {
  loggedIn: false,
  user: null
};

const reducers: {
  setLoggedIn: CaseReducer<UserState, PayloadAction<boolean>>,
  setUser: CaseReducer<UserState, PayloadAction<User>>,
} = {
  setLoggedIn(state, action) {
    state.loggedIn = action.payload;
  },

  setUser(state, action) {
    state.user = action.payload
  }
}
    // setUserAgent: (state: UserState, action: PayloadAction<string>) => {
    //   state.userAgent = action.payload;
    // },
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers,
});

export const {
  reducer: userReducer,
  actions: userAction,
} = userSlice;