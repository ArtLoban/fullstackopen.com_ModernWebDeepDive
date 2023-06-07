import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Routes,
  Route,
  Link,
  Navigate,
  useMatch
} from "react-router-dom"
import blogService from './services/blogs'
import {initializeBlogs} from './reducers/blogReducer';
import { setUser } from './reducers/userReducer'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogList from './components/BlogList'
import Header from './components/Header';
import Users from './components/Users';

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(({user}) => user)
  const blogFormRef = useRef()

  useEffect(() => {
    const appUserJSON = window.localStorage.getItem('appUser')

    if (appUserJSON) {
      const user = JSON.parse(appUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const Main = () => {
    return (
      <div>
        <Togglable buttonLabel="New Blog" ref={blogFormRef}>
          <BlogForm blogFormRef={blogFormRef} />
        </Togglable>
        <hr/>
        <BlogList />
      </div>
    )
  }

  return (
    <div>
      <Header />
      <h1>Blogs</h1>
      <Notification />
      <Routes>
        <Route path="/users" element={<Users />} />
        <Route path="/" element={user ? <Main /> : <LoginForm /> } />
      </Routes>
    </div>
  )
}

export default App