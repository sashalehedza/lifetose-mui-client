import { configureStore } from '@reduxjs/toolkit'
import AuthReducer from './features/authSlice'
import PostReducer from './features/postSlice'
import OrderReducer from './features/orderSlice'

export default configureStore({
  reducer: {
    auth: AuthReducer,
    post: PostReducer,
    order: OrderReducer,
  },
})
