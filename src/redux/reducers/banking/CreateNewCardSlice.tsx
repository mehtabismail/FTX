import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// export interface CounterState {
//   value: number
// }

const initialState: any = {
  data: {},
  cardDetails: {},
};

export const createNewCardSlice = createSlice({
  name: 'createNewCard',
  initialState,
  reducers: {
    storeStep1Data: (state: any, action: any) => {
      state.data = action.payload;
    },
    storeCardDetails: (state: any, action: any) => {
      state.cardDetails = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {storeStep1Data, storeCardDetails} = createNewCardSlice.actions;

export default createNewCardSlice.reducer;
