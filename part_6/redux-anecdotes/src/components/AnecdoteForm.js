import { useDispatch } from 'react-redux'
import {createAnecdote} from '../reducers/anecdoteReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const onFormSubmit = (e) => {
    e.preventDefault()

    const value = e.target.text.value.trim()

    if (value.length === 0) {
      alert('Cannot be empty!')
      e.target.text.value = ''
      return
    }

    dispatch(createAnecdote(value))
    e.target.text.value = ''
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={onFormSubmit}>
        <div>
          <input name="text" />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm