import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import navigationStrings from '../../../constants/navigationStrings';

export const MarketDataApi = createApi({
  reducerPath: 'marketData',
  baseQuery: fetchBaseQuery({
    baseUrl: navigationStrings.BASE_URL,
  }),

  endpoints: builder => ({
    //   MARKET DATA API
    MarketData: builder.query<any, any>({
      query: data => {
        return {
          url: `market/get/data?type=spot&filterdata=USD,EUR,USDT,BTC`,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'GET',
        };
      },
    }),
  }),
});
export const {useMarketDataQuery} = MarketDataApi;
