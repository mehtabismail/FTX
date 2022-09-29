import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState: any = {
  analyticsData: [],
  UUID: '',
};

export const AnalyticSlice = createSlice({
  name: 'analyticProp',
  initialState,
  reducers: {
    storeAnalyticsData: (state: any, action: any) => {
      state.analyticsData = action.payload;
    },
    storeUUID: (state: any, action: any) => {
      state.UUID = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {storeAnalyticsData, storeUUID} = AnalyticSlice.actions;

export default AnalyticSlice.reducer;