import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {useSelector} from 'react-redux';
import navigationStrings from '../../../constants/navigationStrings';

export const BalanceApi = createApi({
  reducerPath: 'balance',
  baseQuery: fetchBaseQuery({
    baseUrl: navigationStrings.BASE_URL,
  }),
  // refetchOnMountOrArgChange: 5,

  endpoints: builder => ({
    //   FETCH BTC CURRENCY VALUE API
    Balance: builder.query({
      query: token => {
        console.log(token, 'checking tokken');
        return {
          url: `users/wallet/balance`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
          method: 'GET',
          // refetchOnMountOrArgChange: 5,
        };
      },
      // refetchOnMountOrArgChange: 30,
    }),
  }),
});
export const {useBalanceQuery} = BalanceApi;
