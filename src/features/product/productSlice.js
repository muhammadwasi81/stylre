import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import productService from './productService'

const initialState = {
  products: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

export const createProductAction = createAsyncThunk(
  'product/createProduct',
  async (payload, thunkAPI) => {
    try {
      const response = await productService.createProductService(payload)
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

export const productSlice = createSlice({
  name: 'product',
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
      .addCase(createProductAction.pending, (state) => {
        console.log('pending')
        state.isLoading = true
      })
      .addCase(createProductAction.fulfilled, (state, { payload }) => {
        console.log(payload, 'fulfilled')
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.products.push(payload)
      })
      .addCase(createProductAction.rejected, (state, { payload }) => {
        console.log(payload, 'rejected')
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = payload
      })
  },
})

export const { reset } = productSlice.actions
export default productSlice.reducer
