import { useState } from 'react'
import loginService from '../services/login';

const LoginForm = ({ setUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({username, password})

      if (typeof user.token !== 'undefined') {
        window.localStorage.setItem('appUser', JSON.stringify(user))

        setUser(user)
        setUsername('')
        setPassword('')
      }
      // todo: show validation error
    } catch (e) {
      console.log(`Caught error: ${e.message}`);
    }
  }

  return (
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
  )
}

export default LoginForm
