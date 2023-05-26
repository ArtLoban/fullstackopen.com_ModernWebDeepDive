import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer';
import { setNotification, removeNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

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

    anecdoteService.createNew(value)
      .then(anecdote => {
        dispatch(createAnecdote(anecdote))
        dispatch(setNotification('New Anecdote was created!'))
        e.target.text.value = ''
        setTimeout(() => {
          dispatch(removeNotification())
        }, 5000)
      })
      .catch(e => {
        console.log(e.message);
        dispatch(setNotification('Something went wrong'))
        setTimeout(() => {
          dispatch(removeNotification())
        }, 5000)
      })
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