import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { initUsers } from '../reducers/usersReducer';
import {Link} from 'react-router-dom';

const Users = () => {
  const dispatch = useDispatch()
  const users = useSelector(({ users }) => users)

  useEffect(() => {
    dispatch(initUsers())
  }, [])

  if (!users) return <p>No data</p>

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th> </th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {
            users.map(user => {
              return (
                <tr key={user.id}>
                  <td>
                    <Link to={`/users/${user.id}`} >{user.name}</Link>
                  </td>
                  <td>{user.blogs.length}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default Users