import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import navigationStrings from '../../../constants/navigationStrings';
export const CurrencyConvertApi = createApi({
  reducerPath: 'currencyConvert',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://min-api.cryptocompare.com/data/',
  }),

  endpoints: builder => ({
    //   FETCH BTC CURRENCY VALUE API
    ConvertBTC: builder.query<any, any>({
      query: data => {
        console.log(data);
        return {
          url: `pricemulti?fsyms=${data}&tsyms=USD,EUR`,
          method: 'GET',
        };
      },
    }),

    //   FETCH MATIC CURRENCY VALUE API
    ConvertMATIC: builder.query<any, any>({
      query: data => {
        console.log(data);
        return {
          url: `pricemulti?fsyms=${data}&tsyms=USD,EUR`,
          method: 'GET',
        };
      },
    }),

    //   FETCH BSC CURRENCY VALUE API
    ConvertBSC: builder.query<any, any>({
      query: data => {
        console.log(data);
        return {
          url: `pricemulti?fsyms=${data}&tsyms=USD,EUR`,
          method: 'GET',
        };
      },
    }),

    //   FETCH ETH CURRENCY VALUE API
    ConvertETH: builder.query<any, any>({
      query: data => {
        console.log(data);
        return {
          url: `pricemulti?fsyms=${data}&tsyms=USD,EUR`,
          method: 'GET',
        };
      },
    }),

    //   FETCH ETH CURRENCY VALUE API
    CurrencyConvert: builder.query<any, any>({
      query: data => {
        console.log(data);
        return {
          url: `pricemulti?fsyms=${data}&tsyms=USD,EUR`,
          method: 'GET',
        };
      },
    }),
  }),
});
export const {useConvertBTCQuery, useConvertBSCQuery, useConvertETHQuery, useConvertMATICQuery, useCurrencyConvertQuery} = CurrencyConvertApi;
