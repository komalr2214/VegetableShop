// couponsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const couponsSlice = createSlice({
  name: 'coupons',
  initialState: [],
  reducers: {
    addCoupon: (state, action) => {
      state.push(action.payload);
    },
    removeCoupon: (state, action) => {
      return state.filter(coupon => coupon.id !== action.payload.id);
    },
    updateCoupon: (state, action) => {
      const index = state.findIndex(coupon => coupon.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    setCoupons: (state, action) => {
      return action.payload;
    }
  }
});

export const { addCoupon, removeCoupon, updateCoupon, setCoupons } = couponsSlice.actions;
export default couponsSlice.reducer;