import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import navigationStrings from '../../../constants/navigationStrings';

export const WalletApi = createApi({
  reducerPath: 'walletDetails',
  baseQuery: fetchBaseQuery({
    baseUrl: navigationStrings.BASE_URL,
  }),
  // refetchOnMountOrArgChange: 5,

  endpoints: builder => ({
    //   FETCH WALLET ADDRESSES
    WalletAddress: builder.mutation({
      query: data => {
        console.log(data?.token, 'checking tokken');
        return {
          url: `wallet/address`,
          headers: {
            Authorization: `Bearer ${data?.token}`,
          },
          method: 'POST',
          body: {name: data?.currency_code},
          // refetchOnMountOrArgChange: 5,
        };
      },
      // refetchOnMountOrArgChange: 30,
    }),
  }),
});
export const {useWalletAddressMutation} = WalletApi;
