import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: false,
  reducers: {
    set(state, action) {
      return action.payload
    },
    clear() {
      return false
    }
  }
})

export const { set, clear } = notificationSlice.actions

export const setNotification = (text, delay = 1) => {
  return async dispatch => {
    dispatch(set(text))

    setTimeout(() => {
      dispatch(clear())
    }, delay*1000)
  }
}

export default notificationSlice.reducer
