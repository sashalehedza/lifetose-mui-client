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

export const getAllOrders = createAsyncThunk(
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

export const getMyOrders = createAsyncThunk(
  'order/getOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getMyOrders()
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
    [getAllOrders.pending]: (state, action) => {},
    [getAllOrders.fulfilled]: (state, action) => {
      state.orders = action.payload
    },
    [getAllOrders.rejected]: (state, action) => {},

    [getMyOrders.pending]: (state, action) => {},
    [getMyOrders.fulfilled]: (state, action) => {
      state.orders = action.payload
    },
    [getMyOrders.rejected]: (state, action) => {},

    [createOrder.pending]: (state, action) => {},
    [createOrder.fulfilled]: (state, action) => {},
    [createOrder.rejected]: (state, action) => {},
  },
})

export default orderSlice.reducer
