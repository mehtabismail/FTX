import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {configData} from '../../../config/config';
import navigationStrings from '../../../constants/navigationStrings';

export const UserBankDetailsApi = createApi({
  reducerPath: 'bankDetails',
  baseQuery: fetchBaseQuery({
    baseUrl: navigationStrings.BASE_URL,
  }),

  endpoints: builder => ({
    getUserBank: builder.query<any, any>({
      query: (token) => {
          console.log("rtk api fetching data: " )
        return {
          url: 'bank',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          method: 'GET',
        };
      },
    }),

  }),
});
export const {
  useGetUserBankQuery
} = UserBankDetailsApi;
