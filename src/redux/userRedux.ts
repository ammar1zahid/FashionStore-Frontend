import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IPaymentMethod {
  _id?: string
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;
}

interface CurrentUser {
  _id?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  paymentMethods?: IPaymentMethod[]; // Include payment methods
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
    updateUserSuccess: (state, action: PayloadAction<CurrentUser>) => {
      state.isFetching = false;
      state.currentUser = {
        ...state.currentUser,
        ...action.payload,
      };
    },
    // Payment-related reducers
    addPaymentSuccess: (state, action: PayloadAction<IPaymentMethod[]>) => {
      if (state.currentUser) {
        state.currentUser.paymentMethods = action.payload;
      }
      state.isFetching = false;
    },
    editPaymentSuccess: (state, action: PayloadAction<IPaymentMethod[]>) => {
      if (state.currentUser) {
        state.currentUser.paymentMethods = action.payload;
      }
      state.isFetching = false;
    },
    deletePaymentSuccess: (state, action: PayloadAction<IPaymentMethod[]>) => {
      if (state.currentUser) {
        state.currentUser.paymentMethods = action.payload;
      }
      state.isFetching = false;
    },
    fetchPaymentsSuccess: (state, action: PayloadAction<IPaymentMethod[]>) => {
      if (state.currentUser) {
        state.currentUser.paymentMethods = action.payload;
      }
      state.isFetching = false;
    },
  },
});

export const {
  start,
  failure,
  loginSuccess,
  registerSuccess,
  updateUserSuccess,
  logout,
  addPaymentSuccess,
  editPaymentSuccess,
  deletePaymentSuccess,
  fetchPaymentsSuccess,
} = userSlice.actions;

export default userSlice.reducer;
