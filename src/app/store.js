import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import deliveryReducer from '../features/delivery/deliverySlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    delivery: deliveryReducer,
  },
})
