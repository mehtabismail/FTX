import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {configData} from '../../../config/config';
import navigationStrings from '../../../constants/navigationStrings';

const {server_url, api_key} = configData;

export const ManagedAccountApi = createApi({
  reducerPath: 'managedAccount',
  baseQuery: fetchBaseQuery({
    baseUrl: server_url,
  }),

  endpoints: builder => ({
    getAccountDetails: builder.query<any, any>({
      query: data => {
        console.log('rtk api fetching data IBAN: ');
        return {
          url: `/multi/managed_accounts/${data?.bank_id}/iban`,
          headers: {
            Accept: 'application/json',
            'idempotency-ref': 'ref_3896',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${data?.corporate_token}`,
            'api-key': api_key,
          },
          method: 'GET',
        };
      },
    }),
  }),
});
export const {useGetAccountDetailsQuery} = ManagedAccountApi;
