import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '../api'
import { extractErrorMessage } from '../utils'
import { toast } from 'react-toastify'

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.createOrder()
      return response.data
    } catch (err) {
      toast.error(extractErrorMessage(err))
      return rejectWithValue(extractErrorMessage(err))
    }
  }
)

export const getOrders = createAsyncThunk(
  'order/getOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getOrders()
      return response.data
    } catch (err) {
      toast.error(extractErrorMessage(err))
      return rejectWithValue(extractErrorMessage(err))
    }
  }
)

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orders: null,
  },

  extraReducers: {
    [getOrders.pending]: (state, action) => {
      state.orders = null
    },
    [getOrders.fulfilled]: (state, action) => {
      state.orders = action.payload
    },
    [getOrders.rejected]: (state, action) => {},
    [createOrder.pending]: (state, action) => {},
    [createOrder.fulfilled]: (state, action) => {},
    [createOrder.rejected]: (state, action) => {},
  },
})

export default orderSlice.reducer
