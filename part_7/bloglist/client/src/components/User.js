import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import usersService from '../services/users'

const User = () => {
  const [user, setUser] = useState()
  const params = useParams()
  const userId = params?.id

  useEffect(() => {
    usersService.getUser(userId).then(user => {
      setUser(user)
    })
  }, [])

  if (!user) {
    return null
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>
      <ul>
        {
          user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)
        }
      </ul>
    </div>
  )
}

export default User