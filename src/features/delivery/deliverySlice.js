import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import deliveryService from './deliveryService'

const initialState = {
  deliveries: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

export const createDeliveryAction = createAsyncThunk(
  'delivery/createDelivery',
  async (delivery, thunkAPI) => {
    try {
      const response = await deliveryService.createDeliveryService(delivery)
      console.log(response.data, 'createDeliveryAction')
      return response.data
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

export const deliverySlice = createSlice({
  name: 'delivery',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
  },
  extraReducers: {
    [createDeliveryAction.pending]: (state) => {
      state.isLoading = true
    },
    [createDeliveryAction.fulfilled]: (state, { payload }) => {
      console.log(payload, 'payload')
      state.isLoading = false
      state.isSuccess = true
      state.deliveries.push(payload)
    },
    [createDeliveryAction.rejected]: (state, { payload }) => {
      state.isLoading = false
      state.isError = true
      state.message = payload
    },
  },
})

export const { reset } = deliverySlice.actions
export default deliverySlice.reducer
