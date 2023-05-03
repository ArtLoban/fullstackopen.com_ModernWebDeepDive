import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    const appUserJSON = window.localStorage.getItem('appUser')

    if (appUserJSON) {
      const user = JSON.parse(appUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }

    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [])

  const onLogoutClick = () => {
    setUser(null)
    window.localStorage.removeItem('appUser')
  }

  const renderUser = () => {
    return (
      <div>
        <span>{user.name} logged in</span>
        <button onClick={onLogoutClick}>Logout</button>
        <hr/>
      </div>
    )
  }

  const renderContent = () => {
    if (user === null) {
      return <LoginForm setUser={setUser} setMessage={setMessage} />
    }

    return (
      <>
        { renderUser() }
        <BlogForm blogs={blogs} updateBlogs={setBlogs} setMessage={setMessage} />
        <hr/>
        { blogs.map(blog => <Blog key={blog.id} blog={blog} />) }
      </>
    )
  }

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={message} setMessage={setMessage} />
      { renderContent() }
    </div>
  )
}

export default App