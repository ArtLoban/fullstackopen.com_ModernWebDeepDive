import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
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
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    editAnecdote(state, action) {
      return state.map(item => item.id !== action.payload.id ? item : action.payload)
    }
  }
})

export const { voteAnecdote, setAnecdotes, appendAnecdote, editAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const notes = await anecdoteService.getAll()
    dispatch(setAnecdotes(notes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newNote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newNote))
  }
}

export const updateAnecdote = anecdote => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.update(anecdote)
    dispatch(editAnecdote(updatedAnecdote))
  }
}

export default anecdoteSlice.reducer