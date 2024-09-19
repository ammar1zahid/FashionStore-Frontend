import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CurrentUser {
  _id: string;
  username: string;
  email: string;
  
}

interface UserState {
  currentUser: CurrentUser | null;
  isFetching: boolean;
  error: boolean;
}

const initialState: UserState = {
  currentUser: null,
  isFetching: false,
  error: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    start: (state) => {
      state.isFetching = true;
    },
    failure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    loginSuccess: (state, action: PayloadAction<CurrentUser>) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    registerSuccess: (state) => {
      state.isFetching = false;
      state.error = false;
    },
    logout: (state) => {
      state.currentUser = null;
    },
  },
});

export const { start, failure, loginSuccess, registerSuccess, logout } = userSlice.actions;
export default userSlice.reducer;
