import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import blogService from './services/blogs'
import {initializeBlogs} from './reducers/blogReducer';
import { setUser } from './reducers/userReducer'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogList from './components/BlogList'

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

  const onLogoutClick = () => {
    dispatch(setUser(null))
    window.localStorage.removeItem('appUser')
  }

  const renderContent = () => {
    if (user === null) {
      return <LoginForm />
    }

    return (
      <>
        <div>
          <span>{user.name} logged in</span>
          <button onClick={onLogoutClick}>Logout</button>
          <hr/>
        </div>
        <Togglable buttonLabel="New Blog" ref={blogFormRef}>
          <BlogForm blogFormRef={blogFormRef} />
        </Togglable>
        <hr/>
        <BlogList />
      </>
    )
  }

  return (
    <div>
      <h1>Blogs</h1>
      <Notification />
      { renderContent() }
    </div>
  )
}

export default App