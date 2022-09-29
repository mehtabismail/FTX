import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import navigationStrings from '../../../constants/navigationStrings';
import {
  RegisterRequest,
  RegisterResponse,
  SigninRequest,
  SigninResponse,
} from './Types';

export const AuthenticationApi = createApi({
  reducerPath: 'authentication',
  baseQuery: fetchBaseQuery({
    baseUrl: navigationStrings.BASE_URL,
    // prepare headers
    //  prepareHeaders :((header)=>{

    //   return header
    // })
  }),

  endpoints: builder => ({
    //   REGISTER API
    Register: builder.mutation<any, any>({
      query: data => {
        console.log('new data in RTQ : ', data);
        return {
          url: 'users/signup',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: data,
          method: 'POST',
        };
      },
    }),

    // LOGIN API
    Login: builder.mutation<any, any>({
      query: data => {
        console.log('new data : ', data);
        return {
          url: 'users/signin',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: data,
          method: 'POST',
        };
      },
    }),

    // FORGET PASSWORD
    ForgetPass: builder.mutation<any, any>({
      query: data => {
        console.log('new data in RTK Query : ', data);
        return {
          url: 'users/forgot/password',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: data,
          method: 'POST',
        };
      },
    }),

    //   OPEN DASHBOARD API
    OpenDashboard: builder.mutation<any, any>({
      query: data => {
        console.log('new data in RTQ : ', data);
        return {
          url: 'users/profile',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${data.token}`,
          },
          body: data.data,
          method: 'PUT',
        };
      },
    }),
  }),
});
export const {
  useLoginMutation,
  useRegisterMutation,
  useForgetPassMutation,
  useOpenDashboardMutation,
} = AuthenticationApi;
