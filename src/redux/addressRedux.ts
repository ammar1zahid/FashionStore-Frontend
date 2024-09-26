import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define interface for Address
interface Address {
  _id: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

// Define interface for AddressState
interface AddressState {
  addresses: Address[];
  isFetching: boolean;
  error: boolean;
}

// Initial state for addresses
const initialState: AddressState = {
  addresses: [],
  isFetching: false,
  error: false,
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    startAddress: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    failureAddress: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    setAddresses: (state, action: PayloadAction<Address[]>) => {
      state.isFetching = false;
      state.addresses = action.payload;
    },
    addAddressSuccess: (state, action: PayloadAction<Address>) => {
      state.isFetching = false;
      state.addresses.push(action.payload);
    },
    updateAddressSuccess: (state, action: PayloadAction<Address>) => {
      state.isFetching = false;
      const index = state.addresses.findIndex(
        (address) => address._id === action.payload._id
      );
      if (index !== -1) {
        state.addresses[index] = action.payload;
      }
    },
    deleteAddressSuccess: (state, action: PayloadAction<string>) => {
      state.isFetching = false;
      state.addresses = state.addresses.filter(
        (address) => address._id !== action.payload
      );
    },
  },
});

export const {
  startAddress,
  failureAddress,
  setAddresses,
  addAddressSuccess,
  updateAddressSuccess,
  deleteAddressSuccess,
} = addressSlice.actions;
export default addressSlice.reducer;
