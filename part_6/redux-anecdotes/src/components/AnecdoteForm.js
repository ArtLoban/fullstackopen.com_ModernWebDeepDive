import { useDispatch } from 'react-redux'
import {createAnecdote} from '../reducers/anecdoteReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const onFormSumbit = (e) => {
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
    <form onSubmit={onFormSumbit}>
      <div>
        <input name="text" />
      </div>
      <button>create</button>
    </form>
  )
}

export default AnecdoteForm