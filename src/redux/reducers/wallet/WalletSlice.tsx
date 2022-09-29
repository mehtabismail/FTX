import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState: any = {
  cryptoWallets: [],
  totalBalance: 0,
};

export const WalletSlice = createSlice({
  name: 'walletProps',
  initialState,
  reducers: {
    storeCryptoWallets: (state: any, action: any) => {
      state.cryptoWallets = action.payload;
    },
    storeTotalBalance: (state: any, action: any) => {
      state.totalBalance = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {storeCryptoWallets, storeTotalBalance} = WalletSlice.actions;

export default WalletSlice.reducer;
