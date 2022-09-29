import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import navigationStrings from '../../../constants/navigationStrings';

export const TransactionHistoryApi = createApi({
  reducerPath: 'transactionHistory',
  baseQuery: fetchBaseQuery({
    baseUrl: navigationStrings.BASE_URL,
  }),

  endpoints: builder => ({
    //   FETCH TRANSACTION HISTORY OF BITCOIN
    btcTransactionHistory: builder.query({
      query: data => {
        console.log(data, 'checking tokken');
        return {
          url: `https://api-eu1.tatum.io/v3/bitcoin/transaction/address/${data}?pageSize=45`,
          headers: {
            'x-api-key': 'f571e2a8-e666-4731-aad7-22d841d86a18_100',
          },
          method: 'GET',
        };
      },
    }),

    //   FETCH TRANSACTION HISTORY OF ETHEREUM
    ethTransactionHistory: builder.query({
      query: data => {
        console.log(data, 'checking tokken');
        return {
          url: `https://api-eu1.tatum.io/v3/ethereum/account/transaction/${data}?pageSize=45`,
          headers: {
            'x-api-key': 'f571e2a8-e666-4731-aad7-22d841d86a18_100',
          },
          method: 'GET',
        };
      },
    }),

    //   FETCH TRANSACTION HISTORY OF POLYGON
    maticTransactionHistory: builder.query({
      query: data => {
        console.log(data, 'checking tokken');
        return {
          url: `https://api-eu1.tatum.io/v3/polygon/account/transaction/${data}?pageSize=45`,
          headers: {
            'x-api-key': 'f571e2a8-e666-4731-aad7-22d841d86a18_100',
          },
          method: 'GET',
        };
      },
    }),

    //   FETCH TRANSACTION HISTORY OF TRON
    trxTransactionHistory: builder.query({
      query: data => {
        console.log(data, 'checking tokken');
        return {
          url: `https://api-eu1.tatum.io/v3/tron/transaction/account/${data}`,
          headers: {
            'x-api-key': 'f571e2a8-e666-4731-aad7-22d841d86a18_100',
          },
          method: 'GET',
        };
      },
    }),
  }),
});
export const {
  useBtcTransactionHistoryQuery,
  useEthTransactionHistoryQuery,
  useMaticTransactionHistoryQuery,
  useTrxTransactionHistoryQuery,
} = TransactionHistoryApi;
