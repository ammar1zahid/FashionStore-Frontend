import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartRedux";
import userReducer from "./userRedux";
import wishlistReducer from "./wishlistRedux";
import addressReducer from "./addressRedux";
import rattingReducer from "./RattingRedux";
import commentReducer from "./commentRedux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";


const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({ user: userReducer, cart: cartReducer , wishlist: wishlistReducer , address:addressReducer ,rating:rattingReducer ,comments:commentReducer});

const persistedReducer = persistReducer(persistConfig, rootReducer); 

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});   

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;