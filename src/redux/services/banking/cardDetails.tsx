import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {configData} from '../../../config/config';
import navigationStrings from '../../../constants/navigationStrings';

const {corporate_token, server_url, api_key, managed_card_id} = configData;

export const BankingCardsApi = createApi({
  reducerPath: 'bankingCards',
  baseQuery: fetchBaseQuery({
    baseUrl: navigationStrings.BASE_URL,
  }),

  endpoints: builder => ({
    createCard: builder.mutation<any, any>({
      query: data => {
        console.log('new data : ', data);
        return {
          url: 'https://sandbox.weavr.io//multi/managed_cards',
          headers: {
            Accept: 'application/json',
            'idempotency-ref': 'ref_3896',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${corporate_token}`,
            'api-key': api_key,
          },
          body: data,
          method: 'POST',
        };
      },
    }),

    kycLevel: builder.mutation<any, any>({
      query: data => {
        console.log('new data : ', data);
        return {
          url: `${navigationStrings.BASE_URL}kyc`,
          headers: {
            Authorization: `Bearer ${data?.token}`,
          },
          body: data?.formdata,
          method: 'POST',
        };
      },
    }),

    getUserDetails: builder.query<any, any>({
      query: data => {
        console.log('new data : ', data);
        return {
          url: `${navigationStrings.BASE_URL}users/getuser`,
          headers: {
            Authorization: `Bearer ${data}`,
          },
          method: 'GET',
        };
      },
    }),

    // GET BANKING CARD DETAILS
    getCardDetail: builder.query<any, void | any>({
      query: data => {
        console.log('data passed to redux: ', data);
        return {
          url: `${server_url}/multi/managed_cards/${managed_card_id}`,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${corporate_token}`,
            'api-key': api_key,
          },
          method: 'GET',
          body: data,
        };
      },
    }),

    managedCardRules: builder.query<any, void>({
      query: () => {
        return {
          url: `${server_url}/multi/managed_cards/108769790605328394/spend_rules`,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${corporate_token}`,
            'api-key': api_key,
          },
          method: 'GET',
        };
      },
    }),

    managedCardSpendRules: builder.mutation<any, any>({
      query: data => {
        console.log('rtk post requestfor managed cards rule: ', data);
        return {
          url: `${server_url}/multi/managed_cards/${data?.card_id}/spend_rules`,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${data?.corporate_token}`,
            'api-key': api_key,
          },
          method: 'PUT',
          body: data?.managed_card_formData,
        };
      },
    }),

    freezeCard: builder.mutation<any, any>({
      query: data => {
        console.log('rtk post requestfor freeze cards : ', data);
        return {
          url: `${server_url}/multi/managed_cards/${data}/block`,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${data?.corporate_token}`,
            'api-key': api_key,
          },
          method: 'POST',
        };
      },
    }),

    unFreezeCard: builder.mutation<any, any>({
      query: data => {
        console.log('rtk post requestfor un-freeze cards : ', data);
        return {
          url: `${server_url}/multi/managed_cards/${data}/unblock`,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${corporate_token}`,
            'api-key': api_key,
          },
          method: 'POST',
        };
      },
    }),

    terminateCard: builder.mutation<any, any>({
      query: data => {
        console.log('rtk post requestfor terminate cards : ', data);
        return {
          url: `${server_url}/multi/managed_cards/${data}/remove`,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${corporate_token}`,
            'api-key': api_key,
          },
          method: 'POST',
        };
      },
    }),
  }),
});
export const {
  useCreateCardMutation,
  useKycLevelMutation,
  useGetCardDetailQuery,
  useManagedCardRulesQuery,
  useManagedCardSpendRulesMutation,
  useGetUserDetailsQuery,
  useFreezeCardMutation,
  useUnFreezeCardMutation,
  useTerminateCardMutation,
} = BankingCardsApi;
