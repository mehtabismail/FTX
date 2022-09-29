import {createSlice} from '@reduxjs/toolkit';

export const favorite = createSlice({
  name: 'favorite',

  initialState: {
    favoriteData: [],
    orderCompleted: false,
  },

  reducers: {
    setFavorite: (state, {payload}) => {
      state.favoriteData = payload;
    },
    storeOrderCompleted: (state, {payload}) => {
      state.orderCompleted = payload;
    },
  },
});

// Action creators are generated for each case reducer function

export const {setFavorite, storeOrderCompleted} = favorite.actions;

export default favorite.reducer;
