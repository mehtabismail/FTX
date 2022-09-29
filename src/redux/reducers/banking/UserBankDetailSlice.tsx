import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState: any = {
  bankDetails: {},
  accountDetails: {},
  userDetails: {},
  managedCardDetails: {},
  card_id: null,
};

export const userBankDetailSlice = createSlice({
  name: 'userBankDetails',
  initialState,
  reducers: {
    storeUserBankDetails: (state: any, action: any) => {
      state.bankDetails = action.payload;
    },
    storeAccountDetails: (state: any, action: any) => {
      state.accountDetails = action.payload;
    },
    removeAccountDetails: (state: any) => {
      state.accountDetails = initialState;
    },
    storeUserDetails: (state: any, action: any) => {
      state.userDetails = action.payload;
    },
    storeManagedCardDetails: (state: any, action: any) => {
      state.managedCardDetails = action.payload;
    },
    storeCardId: (state: any, action: any) => {
      state.card_id = action.payload;
    },

  },
});

// Action creators are generated for each case reducer function
export const {storeUserBankDetails, storeAccountDetails, removeAccountDetails, storeUserDetails, storeManagedCardDetails, storeCardId} =
  userBankDetailSlice.actions;

export default userBankDetailSlice.reducer;
