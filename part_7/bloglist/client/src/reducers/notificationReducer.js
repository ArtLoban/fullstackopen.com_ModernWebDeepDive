const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload
    case 'CLEAR':
      return null
    default:
      return state
  }
}

export const setNotification = notification => {
  return {
    type: 'SET',
    payload: notification,
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR'
  }
}

export default notificationReducer
