import { useDispatch, useSelector } from 'react-redux'
import { clearNotification } from '../reducers/notificationReducer'

const Notification = () => {
  const dispatch = useDispatch()
  const notification = useSelector(({ notification }) => notification)

  if (notification === null) {
    return null
  }

  let className = 'msg'

  switch (notification.status) {
    case 'error':
      className += ' error'
      break
    case 'success':
      className += ' success'
  }

  const renderMessage = () => {
    const duration = notification.duration || 2000

    setTimeout(() => {
      dispatch(clearNotification())
    }, duration)

    return (
      <div className={className}>
        {notification.body}
      </div>
    )
  }

  return renderMessage()
}

export default Notification