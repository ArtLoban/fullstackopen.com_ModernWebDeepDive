const Notification = ({ message }) => {
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

  return (
    <div className={className}>
      {message.body}
    </div>
  )
}

export default Notification