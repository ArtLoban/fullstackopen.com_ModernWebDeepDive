const Notification = ({ message, setMessage }) => {
  if (message === null) {
    return null
  }

  let className = 'msg';

  switch (message.status) {
    case 'error':
      className += ' error'
      break
    case 'success':
      className += ' success'
  }

  const renderMessage = () => {
    const duration = message.duration || 2000

    setTimeout(() => {
      setMessage(null)
    }, duration)

    return (
      <div className={className}>
        {message.body}
      </div>
    )
  }

  return renderMessage()
}

export default Notification