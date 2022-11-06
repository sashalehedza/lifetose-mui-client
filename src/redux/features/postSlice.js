import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as api from '../api'
import { extractErrorMessage } from '../utils'
import { toast } from 'react-toastify'

export const getPosts = createAsyncThunk(
  'post/getPosts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getPosts()
      return response.data
    } catch (err) {
      toast.error(extractErrorMessage(err))
      return rejectWithValue(extractErrorMessage(err))
    }
  }
)

export const getPost = createAsyncThunk(
  'post/getPost',
  async ({ id, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.getPost(id)
      return response.data
    } catch (err) {
      if (err.message === 'Network Error') {
        console.log(err)
        toast.error(extractErrorMessage(err))
        return rejectWithValue(extractErrorMessage(err))
      }
      if (err.response.data.message === 'Post not found') {
        navigate('/notfound')
        toast.error(extractErrorMessage(err))
        return rejectWithValue(extractErrorMessage(err))
      }
    }
  }
)

export const likePost = createAsyncThunk(
  'post/likePost',
  async ({ _id }, { rejectWithValue }) => {
    try {
      const response = await api.likePost(_id)
      return response.data
    } catch (err) {
      toast.error(extractErrorMessage(err))
      return rejectWithValue(extractErrorMessage(err))
    }
  }
)

export const getPostsByUser = createAsyncThunk(
  'post/getPostsByUser',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.getPostsByUser(userId)
      return response.data
    } catch (err) {
      toast.error(extractErrorMessage(err))
      return rejectWithValue(extractErrorMessage(err))
    }
  }
)

export const createPost = createAsyncThunk(
  'post/createPost',
  async ({ updatedPostData, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.createPost(updatedPostData)
      navigate('/')
      return response.data
    } catch (err) {
      toast.error(extractErrorMessage(err))
      return rejectWithValue(extractErrorMessage(err))
    }
  }
)

export const updatePost = createAsyncThunk(
  'post/updatePost',
  async ({ id, updatedPostData, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.updatePost(updatedPostData, id)
      navigate('/')
      return response.data
    } catch (err) {
      toast.error(extractErrorMessage(err))
      return rejectWithValue(extractErrorMessage(err))
    }
  }
)

export const deletePost = createAsyncThunk(
  'post/deletePost',
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await api.deletePost(id)
      return response.data
    } catch (err) {
      toast.error(extractErrorMessage(err))
      return rejectWithValue(extractErrorMessage(err))
    }
  }
)

export const searchPosts = createAsyncThunk(
  'post/searchPosts',
  async (searchQuery, { rejectWithValue }) => {
    try {
      const response = await api.getPostsBySearch(searchQuery)
      return response.data
    } catch (err) {
      toast.error(extractErrorMessage(err))
      return rejectWithValue(extractErrorMessage(err))
    }
  }
)

export const getPostsByTag = createAsyncThunk(
  'post/getPostsByTag',
  async (tag, { rejectWithValue }) => {
    try {
      const response = await api.getTagPosts(tag)
      return response.data
    } catch (err) {
      toast.error(extractErrorMessage(err))
      return rejectWithValue(extractErrorMessage(err))
    }
  }
)

export const getRelatedPosts = createAsyncThunk(
  'post/getRelatedPosts',
  async (tags, { rejectWithValue }) => {
    try {
      const response = await api.getRelatedPosts(tags)
      return response.data
    } catch (err) {
      toast.error(extractErrorMessage(err))
      return rejectWithValue(extractErrorMessage(err))
    }
  }
)

const postSlice = createSlice({
  name: 'post',
  initialState: {
    post: null,
    posts: null,
    userPosts: null,
    tagPosts: null,
    relatedPosts: null,
    cart: [],
    error: '',
  },
  reducers: {
    addToCart: (state, action) => {
      const { postId, count } = action.payload
      const found = state.cart.find((el) => String(el._id) === String(postId))
      if (found && count) {
        const post = state.cart.find(
          (post) => String(post._id) === String(postId)
        )
        post.count += count
      } else {
        const post = state.posts.find(
          (post) => String(post._id) === String(postId)
        )
        post.count = count
        state.cart.push(post)
      }
    },
    minusFromCart: (state, action) => {
      const { postId, count } = action.payload
      const found = state.cart.find((el) => el._id === postId)
      if (found && count) {
        const post = state.cart.find(
          (post) => String(post._id) === String(postId)
        )
        post.count -= 1
      } else {
        const post = state.posts.find(
          (post) => String(post._id) === String(postId)
        )
        post.count = count
        state.cart.push(post)
      }
    },
    removeFromCart: (state, action) => {
      const { postId } = action.payload
      state.cart = state.cart.filter((obj) => obj._id !== postId)
    },
    replaceInCart: (state, action) => {
      const { postId, count } = action.payload
      const found = state.cart.find((el) => el._id === postId)
      if (found && count) {
        const post = state.cart.find(
          (post) => String(post._id) === String(postId)
        )
        post.count = count
      }
    },
    clearCart: (state, action) => {
      state.cart = []
    },
  },
  extraReducers: {
    [getPosts.pending]: (state, action) => {
      state.post = null
      state.tagPosts = null
      state.relatedPosts = null
      state.error = ''
    },
    [getPosts.fulfilled]: (state, action) => {
      state.posts = action.payload
      state.error = ''
    },
    [getPosts.rejected]: (state, action) => {
      state.error = action.payload
    },

    [getPost.pending]: (state, action) => {
      state.error = ''
    },
    [getPost.fulfilled]: (state, action) => {
      state.post = action.payload
      state.error = ''
    },
    [getPost.rejected]: (state, action) => {
      if (action.payload !== 'Post not found') {
        state.error = action.payload
      }
    },

    [getPostsByUser.pending]: (state, action) => {
      state.error = ''
    },
    [getPostsByUser.fulfilled]: (state, action) => {
      state.userPosts = action.payload
      state.error = ''
    },
    [getPostsByUser.rejected]: (state, action) => {
      state.error = action.payload
    },

    [createPost.pending]: (state, action) => {
      state.posts = null
      state.userPosts = null
    },
    [createPost.fulfilled]: (state, action) => {},
    [createPost.rejected]: (state, action) => {},

    [updatePost.pending]: (state, action) => {},
    [updatePost.fulfilled]: (state, action) => {
      const {
        arg: { id },
      } = action.meta
      if (id) {
        state.userPosts = state.userPosts.map((item) =>
          item._id === id ? action.payload : item
        )
        state.posts = state.posts.map((item) =>
          item._id === id ? action.payload : item
        )
      }
    },
    [updatePost.rejected]: (state, action) => {},

    [deletePost.pending]: (state, action) => {},
    [deletePost.fulfilled]: (state, action) => {
      const {
        arg: { id },
      } = action.meta
      if (id) {
        state.userPosts = state.userPosts.filter((item) => item._id !== id)
        state.posts = state.posts.filter((item) => item._id !== id)
      }
    },
    [deletePost.rejected]: (state, action) => {},

    [likePost.pending]: (state, action) => {},
    [likePost.fulfilled]: (state, action) => {
      const {
        arg: { _id },
      } = action.meta
      if (_id) {
        state.posts = state.posts.map((item) =>
          item._id === _id ? action.payload : item
        )
      }
    },
    [likePost.rejected]: (state, action) => {},

    [searchPosts.pending]: (state, action) => {
      state.posts = null
    },
    [searchPosts.fulfilled]: (state, action) => {
      state.posts = action.payload
    },
    [searchPosts.rejected]: (state, action) => {},

    [getPostsByTag.pending]: (state, action) => {
      state.post = null
      state.relatedPosts = null
      state.tagPosts = null
      state.error = ''
    },
    [getPostsByTag.fulfilled]: (state, action) => {
      state.tagPosts = action.payload
      state.error = ''
    },
    [getPostsByTag.rejected]: (state, action) => {
      state.error = action.payload
    },

    [getRelatedPosts.pending]: (state, action) => {},
    [getRelatedPosts.fulfilled]: (state, action) => {
      state.relatedPosts = action.payload
    },
    [getRelatedPosts.rejected]: (state, action) => {},
  },
})

export const selectAllPosts = (state) => state.post.posts

export const selectPostById = (state, postId) =>
  state.post.posts.find((post) => post.id === postId)

export const selectAllCart = (state) => state.post.cart

export const {
  addToCart,
  minusFromCart,
  removeFromCart,
  replaceInCart,
  clearCart,
} = postSlice.actions

export default postSlice.reducer
