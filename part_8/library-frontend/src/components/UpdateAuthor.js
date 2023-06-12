import {useState} from 'react';
import {UPDATE_AUTHOR, ALL_AUTHORS, ALL_BOOKS} from '../queries';
import {useMutation} from '@apollo/client';

const UpdateAuthor = () => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [ updateAuthor ] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [
      { query: ALL_AUTHORS },
      { query: ALL_BOOKS }
    ]
  })

  const submit = (event) => {
    event.preventDefault()

    if (name.trim().length === 0) {
      alert('Can\'t be empty!')
      return null
    }

    updateAuthor({ variables: { name, born }})
    setName('')
    setBorn('')
  }

  return (
    <div style={{marginTop: "40px"}}>
      <h2>Update Author</h2>

      <form onSubmit={submit}>
        <div>
          name <input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          born <input value={born} onChange={(e) => setBorn(Number(e.target.value))} />
        </div>

        <button type="submit">Update author</button>
      </form>
    </div>
  )
}

export default UpdateAuthor
