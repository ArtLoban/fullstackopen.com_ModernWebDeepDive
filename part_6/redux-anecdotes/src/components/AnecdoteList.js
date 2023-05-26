import { useDispatch, useSelector } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if (filter.length > 0) {
      return anecdotes.filter(anecdote => anecdote.content.includes(filter))
    }

    return anecdotes;
  })
  const anecdotesSorted = [...anecdotes].sort((a, b) => b.votes - a.votes)

  const vote = (id) => {
    dispatch(voteAnecdote(id))
  }

  return (
    <div>
      {
        anecdotesSorted
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
    </div>
  )
}

export default AnecdoteList
