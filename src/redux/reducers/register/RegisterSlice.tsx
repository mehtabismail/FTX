import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// export interface CounterState {
//   value: number
// }

const initialState: any = {
  email: '',
  token: '',
  status: '',
  render: '',
  corporate_token: '',
};

export const registerSlice = createSlice({
  name: 'registerProps',
  initialState,
  reducers: {
    storeEmail: (state: any, action: any) => {
      state.email = action.payload;
    },
    storeToken: (state: any, action: any) => {
      state.token = action.payload;
    },
    storeCorporateToken: (state: any, action: any) => {
      state.corporate_token = action.payload;
    },
    storeStatus: (state: any, action: any) => {
      state.status = action.payload;
    },
    storeRender: (state: any, action: any) => {
      state.render = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {storeEmail, storeToken, storeCorporateToken, storeStatus, storeRender} = registerSlice.actions;

export default registerSlice.reducer;
