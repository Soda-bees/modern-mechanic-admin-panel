// import { configureStore } from '@reduxjs/toolkit'
// import usersReducer from "./features/users/usersSlice"

// export const makeStore = () => {
//     return configureStore({
//         reducer: {
//             users: usersReducer,
//         }
//     })
// }

// // Infer the type of makeStore
// export type AppStore = ReturnType<typeof makeStore>
// export type RootState = ReturnType<AppStore['getState']>
// export type AppDispatch = AppStore['dispatch']


import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import adminDataReducer  from './features/adminData/adminDataSlice';
import storage from './storage';

const rootReducer = combineReducers({
    adminData: adminDataReducer,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
};

export const store = makeStore();
export const persistor = persistStore(store);

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
