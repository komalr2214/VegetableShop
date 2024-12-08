// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import couponsReducer from './couponsSlice'; // Import the coupons reducer

const loadState = () => {
  const savedState = sessionStorage.getItem('reduxState');
  return savedState ? JSON.parse(savedState) : undefined;
};

const store = configureStore({
  reducer: {
    auth: authReducer,
    coupons: couponsReducer, // Add coupons reducer
  },
  preloadedState: loadState(),
});

store.subscribe(() => {
  sessionStorage.setItem('reduxState', JSON.stringify(store.getState()));
});

export default store;
// import { configureStore } from '@reduxjs/toolkit';
// import authReducer from './authSlice';

// const loadState = () => {
//   const savedState = sessionStorage.getItem('reduxState');
//   return savedState ? JSON.parse(savedState) : undefined;
// };

// const store = configureStore({
//   reducer: {
//     auth: authReducer,
//   },
//   preloadedState: loadState(),
// });

// store.subscribe(() => {
//   sessionStorage.setItem('reduxState', JSON.stringify(store.getState()));
// });

// export default store;
