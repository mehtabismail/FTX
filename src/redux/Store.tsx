import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import CounterSlice from './reducers/counter/CounterSlice';
import RegisterSlice from './reducers/register/RegisterSlice';
import CreateNewCardSlice from './reducers/banking/CreateNewCardSlice';
import marketSlice from './reducers/market/marketSlice';
import WalletSlice from './reducers/wallet/WalletSlice';
import {AuthenticationApi} from './services/authentication/Authentication';
import {BalanceApi} from './services/wallet/Balance';
import {CurrencyConvertApi} from './services/wallet/CurrencyConvert';
import {BankingCardsApi} from './services/banking/cardDetails';
import {OrderBookDataApi} from './services/market/OrderBook';
import {UserBankDetailsApi} from './services/banking/UserBankDetails';
import UserBankDetailSlice from './reducers/banking/UserBankDetailSlice';
import {ManagedAccountApi} from './services/banking/ManagedAccount';
import storage from 'redux-persist/lib/storage';
import {persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from './reducers/loading/Loading';
import {OrderHistoryApi} from './services/market/OrderHistory';
import {MarketDataApi} from './services/market/SpotTrading';
import {WalletApi} from './services/wallet/WalletDetails';
import {TransactionHistoryApi} from './services/wallet/TransactionHistory';
import {AnalyticsAPI} from './services/analytics/Analytics';
import AnalyticSlice from './reducers/analytics/AnalyticSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const favoriteSlice = persistReducer(persistConfig, marketSlice);
export const store = configureStore({
  reducer: {
    // ALL REDUCERS
    counter: CounterSlice,
    loading: Loading,
    registerProps: RegisterSlice,
    createNewCard: CreateNewCardSlice,
    userBankDetails: UserBankDetailSlice,
    market: favoriteSlice,
    wallet: WalletSlice,
    analytics: AnalyticSlice,

    // API SERVICES
    [AuthenticationApi.reducerPath]: AuthenticationApi.reducer,
    [CurrencyConvertApi.reducerPath]: CurrencyConvertApi.reducer,
    [BalanceApi.reducerPath]: BalanceApi.reducer,
    [BankingCardsApi.reducerPath]: BankingCardsApi.reducer,
    [WalletApi.reducerPath]: WalletApi.reducer,
    [TransactionHistoryApi.reducerPath]: TransactionHistoryApi.reducer,
    [OrderBookDataApi.reducerPath]: OrderBookDataApi.reducer,
    [OrderHistoryApi.reducerPath]: OrderHistoryApi.reducer,
    [UserBankDetailsApi.reducerPath]: UserBankDetailsApi.reducer,
    [ManagedAccountApi.reducerPath]: ManagedAccountApi.reducer,
    [MarketDataApi.reducerPath]: MarketDataApi.reducer,
    [AnalyticsAPI.reducerPath]: AnalyticsAPI.reducer,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      AuthenticationApi.middleware,
      CurrencyConvertApi.middleware,
      WalletApi.middleware,
      TransactionHistoryApi.middleware,
      BalanceApi.middleware,
      BankingCardsApi.middleware,
      OrderBookDataApi.middleware,
      OrderHistoryApi.middleware,
      UserBankDetailsApi.middleware,
      ManagedAccountApi.middleware,
      MarketDataApi.middleware,
      AnalyticsAPI.middleware,
    ),
});
export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
