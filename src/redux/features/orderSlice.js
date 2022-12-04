import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '../api'
import { extractErrorMessage } from '../utils'
import { toast } from 'react-toastify'

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async ({ orderData, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.createOrder(orderData)
      navigate('/my-orders')
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

export const getAllCoupons = createAsyncThunk(
  'order/getAllCoupons',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getAllCoupons()
      return response.data
    } catch (err) {
      toast.error(extractErrorMessage(err))
      return rejectWithValue(extractErrorMessage(err))
    }
  }
)

export const createCoupon = createAsyncThunk(
  'order/createCoupon',
  async ({ updatedCouponData, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.createCoupon(updatedCouponData)
      // navigate('/coupons')
      return response.data
    } catch (err) {
      toast.error(extractErrorMessage(err))
      return rejectWithValue(extractErrorMessage(err))
    }
  }
)

export const updateCoupon = createAsyncThunk(
  'order/updateCoupon',
  async ({ id, updatedCouponData, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.updateCoupon(updatedCouponData, id)
      //navigate('/coupons')
      return response.data
    } catch (err) {
      toast.error(extractErrorMessage(err))
      return rejectWithValue(extractErrorMessage(err))
    }
  }
)

export const deleteCoupon = createAsyncThunk(
  'order/deleteCoupon',
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await api.deleteCoupon(id)
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
    couponname: null,
    couponpercent: null,
    coupons: null,
    error: '',
  },
  reducers: {
    addAppliedCoupon: (state, action) => {
      const { name, percent } = action.payload
      state.couponname = name
      state.couponpercent = percent
    },
    deleteAppliedCoupon: (state, action) => {
      state.couponname = null
      state.couponpercent = null
    },
  },

  extraReducers: {
    [createOrder.pending]: (state, action) => {
      state.myorders = null
    },
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

    [getAllOrders.pending]: (state, action) => {},
    [getAllOrders.fulfilled]: (state, action) => {
      state.orders = action.payload
    },
    [getAllOrders.rejected]: (state, action) => {},

    [getAllCoupons.pending]: (state, action) => {
      state.error = ''
    },
    [getAllCoupons.fulfilled]: (state, action) => {
      state.coupons = action.payload
      state.error = ''
    },
    [getAllCoupons.rejected]: (state, action) => {
      state.error = action.payload
    },

    [createCoupon.pending]: (state, action) => {},
    [createCoupon.fulfilled]: (state, action) => {
      state.coupons = state.coupons.map((item) => item)
      state.coupons.push(action.payload)
    },
    [createCoupon.rejected]: (state, action) => {},

    [updateCoupon.pending]: (state, action) => {},
    [updateCoupon.fulfilled]: (state, action) => {
      const {
        arg: { id },
      } = action.meta
      if (id) {
        state.coupons = state.coupons.map((item) =>
          item._id === id ? action.payload : item
        )
      }
    },
    [updateCoupon.rejected]: (state, action) => {},

    [deleteCoupon.pending]: (state, action) => {},
    [deleteCoupon.fulfilled]: (state, action) => {
      const {
        arg: { id },
      } = action.meta
      if (id) {
        state.coupons = state.coupons.filter((item) => item._id !== id)
      }
    },
    [deleteCoupon.rejected]: (state, action) => {},
  },
})

export const { addAppliedCoupon, deleteAppliedCoupon } = orderSlice.actions

export default orderSlice.reducer
