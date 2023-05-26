import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: false,
  reducers: {
    setNotification(state, action) {
      console.log('setNotification state: ', JSON.parse(JSON.stringify(state)))

      return action.payload
    }
  }
})

export const { setNotification } = notificationSlice.actions
export default notificationSlice.reducer
