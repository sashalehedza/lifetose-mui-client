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
  'order/getMyOrders',
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

export const orderPaid = createAsyncThunk(
  'order/orderPaid',
  async ({ id, updatedOrderData }, { rejectWithValue }) => {
    try {
      const response = await api.orderPaid(updatedOrderData, id)
      return response.data
    } catch (err) {
      toast.error(extractErrorMessage(err))
      return rejectWithValue(extractErrorMessage(err))
    }
  }
)

export const orderDelivered = createAsyncThunk(
  'order/orderDelivered',
  async ({ id, updatedOrderData }, { rejectWithValue }) => {
    try {
      const response = await api.orderDelivered(updatedOrderData, id)
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
    myorders: null,
  },

  extraReducers: {
    [createOrder.pending]: (state, action) => {},
    [createOrder.fulfilled]: (state, action) => {},
    [createOrder.rejected]: (state, action) => {},

    [getAllOrders.pending]: (state, action) => {},
    [getAllOrders.fulfilled]: (state, action) => {
      state.orders = action.payload
    },
    [getAllOrders.rejected]: (state, action) => {},

    [getMyOrders.pending]: (state, action) => {},
    [getMyOrders.fulfilled]: (state, action) => {
      state.myorders = action.payload
    },
    [getMyOrders.rejected]: (state, action) => {},

    [orderPaid.pending]: (state, action) => {},
    [orderPaid.fulfilled]: (state, action) => {
      const {
        arg: { id },
      } = action.meta
      if (id) {
        state.orders = state.orders.map((item) =>
          item._id === id ? action.payload : item
        )
      }
    },
    [orderPaid.rejected]: (state, action) => {},

    [orderDelivered.pending]: (state, action) => {},
    [orderDelivered.fulfilled]: (state, action) => {
      const {
        arg: { id },
      } = action.meta
      if (id) {
        state.orders = state.orders.map((item) =>
          item._id === id ? action.payload : item
        )
      }
    },
    [orderDelivered.rejected]: (state, action) => {},
  },
})

export default orderSlice.reducer
