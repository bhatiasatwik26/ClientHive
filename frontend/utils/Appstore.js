import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./userSlice.js";
import utilReducer from './utilSlice.js';
import chatReducer from './chatSlice.js';
import callReducer from './callSlice.js';
import persistReducer from "redux-persist/es/persistReducer";
const persistConfig = {
  key: "root",
  storage,  
  version: 1  
};

const combinedReducer = combineReducers({ CurrUser: userReducer, GlobalUtil: utilReducer, Chat: chatReducer, Call: callReducer });
const persistedReducer = persistReducer(persistConfig, combinedReducer);

const AppStore = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(AppStore);

export { AppStore, persistor };
