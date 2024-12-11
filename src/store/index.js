import { combineReducers, configureStore } from '@reduxjs/toolkit';
import dashboardReducer from "./reducers/dashboardReducer";
import userReducer from './reducers/userReducer';
import itemsByStoreReducer from './reducers/items-by-shop';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import stateReducer from './reducers/stateReducer';
import cartReducer from './reducers/cartReducer';
import userChoiceReducer from './reducers/userChoiceReducer';
import doctorReducer from './reducers/health-care/doctorReducer';
import allCareReducer from './reducers/all-care-service/allCareReducer';

const rootReducer = combineReducers({
    dashboard: dashboardReducer,
    user: userReducer,
    userChoice: userChoiceReducer,
    itemsByStoreReducer: itemsByStoreReducer,
    cartItems: cartReducer,
    appState: stateReducer,
    doctorInfo: doctorReducer,
    allCare: allCareReducer
});

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['user', 'cartItems', 'userChoice'],//Things want to persist
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