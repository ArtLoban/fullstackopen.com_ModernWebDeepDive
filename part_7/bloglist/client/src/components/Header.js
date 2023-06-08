import { useDispatch, useSelector } from 'react-redux'
import {Link} from 'react-router-dom';
import {setUser} from '../reducers/userReducer';
import styled from 'styled-components'

const Navigation = styled.div`
  background: #87c0de;
  padding: 1em;
`

const Header = () => {
  const dispatch = useDispatch()
  const user = useSelector(({ user }) => user)

  const padding = {
    padding: 5
  }

  const onLogoutClick = () => {
    dispatch(setUser(null))
    window.localStorage.removeItem('appUser')
  }

  return (
    <Navigation>
      <Link style={padding} to="/">Home</Link>
      <Link style={padding} to="/users">Users</Link>
      {
        user &&
          <div style={{display: 'inline', marginLeft: "30px"}}>
            <span>{user.name} logged in</span>
            <button onClick={onLogoutClick}>Logout</button>
          </div>
      }
    </Navigation>
  )
}

export default Header


