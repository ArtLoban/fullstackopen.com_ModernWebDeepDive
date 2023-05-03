import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

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

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <LoginForm setUser={setUser} />
      </div>
    )
  }

  return (
    <div>
      <h1>Blogs</h1>
      { user && renderUser() }
      <BlogForm blogs={blogs} updateBlogs={setBlogs} />
      <hr/>
      { blogs.map(blog => <Blog key={blog.id} blog={blog} />) }
    </div>
  )
}

export default App