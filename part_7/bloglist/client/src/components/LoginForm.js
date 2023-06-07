import { useState } from 'react'
import { useDispatch } from 'react-redux'
import loginService from '../services/login';
import { setNotification } from '../reducers/notificationReducer'
import { setUser } from '../reducers/userReducer'

const LoginForm = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({username, password})

      if (typeof user.token !== 'undefined') {
        window.localStorage.setItem('appUser', JSON.stringify(user))

        dispatch(setUser(user))
        setUsername('')
        setPassword('')
      }
    } catch (e) {
      console.log(`Caught error: ${e.message}`);
      console.log('e.response.data: ', e.response.data);

      const notification = {
        body: e.response?.data?.error || 'Something went wrong',
        status: 'error',
        duration: 5000
      }
      dispatch(setNotification(notification))
    }
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm
