import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      return [...state, action.payload]
    },
    voteAnecdote(state, action) {
      const id = action.payload
      const itemToVote = state.find(item => item.id === id)
      const changedItem = {
        ...itemToVote,
        votes: itemToVote.votes + 1
      }

      return state.map(item => item.id !== id ? item : changedItem)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { createAnecdote, voteAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer