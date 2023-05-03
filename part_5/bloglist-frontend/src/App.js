import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm';

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    const appUserJSON = window.localStorage.getItem('appUser')

    if (appUserJSON) {
      setUser(JSON.parse(appUserJSON))
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
      <h2>blogs</h2>
      { user && renderUser() }
      { blogs.map(blog => <Blog key={blog.id} blog={blog} />) }
    </div>
  )
}

export default App