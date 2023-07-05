import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import paymentService from './paymentService'

const initialState = {
  payments: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

export const createPaymentAction = createAsyncThunk(
  'payment/createPayment',
  async (paymentData, thunkAPI) => {
    try {
      await paymentService.createPaymentService(paymentData)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPaymentAction.pending, (state) => {
        console.log('pending')
        state.isLoading = true
      })
      .addCase(createPaymentAction.fulfilled, (state, action) => {
        console.log(action.payload, 'fulfilled')
        state.isLoading = false
        state.isSuccess = true
        state.message = action.payload
        state.payments.push(action.payload)
      })
      .addCase(createPaymentAction.rejected, (state, { payload }) => {
        console.log(payload, 'rejected')
        state.isLoading = false
        state.isError = true
        state.message = payload
      })
  },
})

export const { reset } = paymentSlice.actions
export default paymentSlice.reducer
