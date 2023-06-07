import { configureStore } from '@reduxjs/toolkit'

import userReducer from './reducers/userReducer'
import blogReducer from './reducers/blogReducer'
import usersReducer from './reducers/usersReducer'
import notificationReducer from './reducers/notificationReducer'

const store = configureStore({
  reducer: {
    user: userReducer,
    blogs: blogReducer,
    users: usersReducer,
    notification: notificationReducer
  }
})

export default store