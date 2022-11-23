import axios from 'axios'

const devEnv = process.env.NODE_ENV !== 'production'

const { REACT_APP_DEV_API, REACT_APP_PROD_API } = process.env

const API = axios.create({
  baseURL: `${devEnv ? REACT_APP_DEV_API : REACT_APP_PROD_API}`,
})

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem('profile')).token
    }`
  }
  return req
})

export const signIn = (formData) => API.post('/users/signin', formData)
export const signUp = (formData) => API.post('/users/signup', formData)

export const createPost = (postData) => API.post('/post', postData)
export const getPosts = () => API.get(`/post`)
export const getPost = (id) => API.get(`/post/${id}`)
export const deletePost = (id) => API.delete(`/post/${id}`)
export const updatePost = (updatedPostData, id) =>
  API.patch(`/post/${id}`, updatedPostData)
export const getPostsByUser = (userId) => API.get(`/post/userPosts/${userId}`)

export const getPostsBySearch = (searchQuery) =>
  API.get(`/post/search?searchQuery=${searchQuery}`)

export const getTagPosts = (tag) => API.get(`/post/tag/${tag}`)
export const getRelatedPosts = (tags) => API.post(`/post/relatedPosts`, tags)
export const likePost = (id) => API.patch(`/post/like/${id}`)

export const getPostComments = (id) => API.get(`/comments/${id}`)
export const createComment = (id, commentData) =>
  API.post(`/comments/${id}`, commentData)
export const deleteComment = (id) => API.delete(`/comments/${id}`)
export const updateComment = (commentData, id) =>
  API.put(`/comments/${id}`, commentData)
export const reply = (commentData, commentId) =>
  API.post(`/comments/${commentId}/reply`, commentData)
export const getAllReply = (commentId) =>
  API.get(`/comments/${commentId}/reply`)

export const createOrder = (orderData) => API.post('/orders/create', orderData)
export const getOrders = () => API.get('/orders')
export const getMyOrders = () => API.get('/orders/userOrders')

export const orderPaid = (updatedOrderData, id) =>
  API.patch(`/orders/paid/${id}`, updatedOrderData)
export const orderDelivered = (updatedOrderData, id) =>
  API.patch(`/orders/delivered/${id}`, updatedOrderData)

export const createCoupon = (couponData) =>
  API.post('/coupons/create', couponData)
export const deleteCoupon = (id) => API.delete(`/coupons/${id}`)
export const updateCoupon = (updatedCouponData, id) =>
  API.patch(`/coupons/${id}`, updatedCouponData)
export const getAllCoupons = () => API.get('/coupons')
export const getCoupon = (id) => API.get(`/coupons/${id}`)
export const getCouponByName = (name) => API.post(`/coupons/search`, name)
