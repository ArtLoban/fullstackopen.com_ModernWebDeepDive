import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    editBlog(state, action) {
      return state.map(item => item.id === action.payload.id ? action.payload : item)
    },
    deleteBlog(state, action) {
      return state.filter(item => item.id !== action.payload)
    }
  },
})

export const { setBlogs, appendBlog, editBlog, deleteBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = content => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch(appendBlog(newBlog))
  }
}

export const updateBlog = content => {
  return async dispatch => {
    const updatedBlog = await blogService.update(content)
    dispatch(editBlog(updatedBlog))
  }
}

export const removeBlog = id => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch(deleteBlog(id))
  }
}

export default blogSlice.reducer
