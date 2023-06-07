import { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import blogService from './services/blogs'
import {initializeBlogs} from './reducers/blogReducer';
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogList from './components/BlogList'

const App = () => {
  const dispatch = useDispatch()
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    const appUserJSON = window.localStorage.getItem('appUser')

    if (appUserJSON) {
      const user = JSON.parse(appUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const onLogoutClick = () => {
    setUser(null)
    window.localStorage.removeItem('appUser')
  }

  const renderContent = () => {
    if (user === null) {
      return <LoginForm setUser={setUser} />
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
        <BlogList user={user} />
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