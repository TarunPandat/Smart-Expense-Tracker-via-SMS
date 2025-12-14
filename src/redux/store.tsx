import { combineReducers, configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import transactionReducer from './features/transactions/transactionSlice'; 

const config = {
    key: 'root',
    storage: AsyncStorage,
    blacklist: ['transactions'], //placeholder for blacklist
}

const rootReducer = combineReducers({
    transactions: transactionReducer, //placeholder for transaction reducer
})

const persistedReducer = persistReducer(config, rootReducer) //placeholder for persisted reducer

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }).concat(logger),
})

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch