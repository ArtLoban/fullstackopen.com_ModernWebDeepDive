import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  console.log(anecdotes);

  const vote = (id) => {
    dispatch({
      type: 'VOTE',
      payload: {id}
    })
  }

  const onFormSumbit = (e) => {
    e.preventDefault()

    const value = e.target.text.value.trim()

    if (value.length === 0) {
      alert('Cannot be empty!')
      e.target.text.value = ''
      return
    }

    dispatch({
      type: 'CREATE_ANECDOTE',
      payload: value
    })

    e.target.text.value = ''
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {
        anecdotes
          .sort((a, b) => b.votes - a.votes)
          .map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id)}>vote</button>
              </div>
            </div>
          )
      }
      <h2>create new</h2>
      <form onSubmit={onFormSumbit}>
        <div>
          <input name="text" />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App