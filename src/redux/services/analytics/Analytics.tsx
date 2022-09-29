import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import navigationStrings from '../../../constants/navigationStrings';

export const AnalyticsAPI = createApi({
  reducerPath: 'analyticsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: navigationStrings.BASE_URL,
  }),

  endpoints: builder => ({
    //   FETCH ANALYTICS DATA
    getAnalytics: builder.mutation({
      query: data => {
        return {
          url: `order/history/analytics`,
          headers: {
            Authorization: `Bearer ${data?.token}`,
          },
          method: 'POST',
          body: data?.formData,
        };
      },
    }),
  }),
});
export const {useGetAnalyticsMutation} = AnalyticsAPI;
