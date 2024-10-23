import { configureStore } from '@reduxjs/toolkit';
// import auth from './slices/authSlice';
// import vehicleSpecificationReducer from './slices/vehicleSpecificationSlice';

// Configure the store with the slices
const store = configureStore({
  reducer: {
  
  },
  // applyMiddleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
});

export default store; 