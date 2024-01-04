import { combineReducers, configureStore } from '@reduxjs/toolkit';
import dashboardReducer from "./reducers/dashboardReducer";
import userReducer from './reducers/userReducer';
import itemsByStoreReducer from './reducers/items-by-shop';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import stateReducer from './reducers/stateReducer';
import cartReducer from './reducers/cartReducer';

const rootReducer = combineReducers({
    dashboard: dashboardReducer,
    user: userReducer,
    itemsByStoreReducer: itemsByStoreReducer,
    cartItems: cartReducer,
    appState: stateReducer
});

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['user', 'cartItems'],//Things you want to persist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);

export default store;

// export default configureStore({
//     reducer: {
//         // consumer: consumerReducer,
//         dashboard: dashboardReducer,
//         user: userReducer,
//     },
//     // middleware: (getDefaultMiddleware) =>
//     //     getDefaultMiddleware({
//     //         serializableCheck: false,
//     //     }),
// });

// import { PURGE } from 'redux-persist';

// // ...

// extraReducers: (builder) => {
//   builder.addCase(PURGE, (state) => {
//     customEntityAdapter.removeAll(state);
//   });
// }