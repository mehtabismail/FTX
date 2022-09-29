// import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
// import navigationStrings from '../../../constants/navigationStrings';
// import {store} from '../../Store';

// // const {token} = store?.getState()?.registerProps;

// export const OrderHistoryApi: any = createApi({
//   reducerPath: 'orderHistory',
//   baseQuery: fetchBaseQuery({
//     baseUrl: navigationStrings.BASE_URL,
//   }),

//   endpoints: builder => ({
//     //   ORDER-HISTORY DATA API
//     orderHistory: builder.mutation<any, any>({
//   query: data => {
//     // console.log(token);
//     return {
//       url: `order/history`,
//       headers: {
//         'Content-Type': 'application/json',
//         // Authorization: `Bearer ${token}`,
//       },
//       method: 'POST',
//       body: data,
//     };
//   },
//     }),
//   }),
// });
// export const {useOrderHistoryMutation} = OrderHistoryApi;

import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import navigationStrings from '../../../constants/navigationStrings';
import {store} from '../../Store';

// let {token}: any = store?.getState()?.registerProps;

export const OrderHistoryApi = createApi({
  reducerPath: 'orderHistory',
  baseQuery: fetchBaseQuery({
    baseUrl: navigationStrings.BASE_URL,
  }),

  endpoints: builder => ({
    //   ORDERBOOK ORDER_HISTORY DATA API
    orderHistory: builder.mutation<any, any>({
      query: ({token, formData}) => {
        // let {token}: any = store?.getState()?.registerProps();
        return {
          url: `order/history`,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          method: 'POST',
          body: formData,
        };
      },
    }),

    //   ORDERBOOK OPEN_ORDERS DATA API
    openOrder: builder.query<any, any>({
      query: ({token}) => {
        return {
          url: `order/history/open`,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          method: 'GET'
        };
      },
    }),

    //   ORDERBOOK TRIGGER_ORDER DATA API
    triggerOrder: builder.query<any, any>({
      query: ({token}) => {
        return {
          url: `order/history/trigger`,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          method: 'GET'
        };
      },
    }),
  }),
});
export const {useOrderHistoryMutation, useOpenOrderQuery, useTriggerOrderQuery} = OrderHistoryApi;
