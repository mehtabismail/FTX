import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import navigationStrings from '../../../constants/navigationStrings';

export const OrderBookDataApi = createApi({
  reducerPath: 'orderData',
  baseQuery: fetchBaseQuery({
    baseUrl: navigationStrings.BASE_URL,
  }),

  endpoints: builder => ({
    //   ORDERBOOK SELL_ORDER DATA API
    activeSellOrder: builder.query<any, any>({
      query: ({baseCurrency, quoteCurrency}) => {
        return {
          url: `order/sell?base_currency=${baseCurrency.toLowerCase()}&&quote_currency=${quoteCurrency.toLowerCase()}`,
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'GET',
        };
      },
    }),

    //   ORDERBOOK BUY_ORDER DATA API
    activeBuyOrder: builder.query<any, any>({
      query: ({baseCurrency, quoteCurrency}) => {
        return {
          url: `order/buy?base_currency=${baseCurrency.toLowerCase()}&&quote_currency=${quoteCurrency.toLowerCase()}`,
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'GET',
        };
      },
    }),
  }),
});
export const {useActiveBuyOrderQuery, useActiveSellOrderQuery} = OrderBookDataApi;
