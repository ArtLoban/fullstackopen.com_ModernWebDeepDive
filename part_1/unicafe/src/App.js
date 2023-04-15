import { useState } from 'react'

const Button = ({ text, handleClick }) => <button onClick={handleClick}>{text}</button>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give feedback</h1>
      <div>
        <Button text={'Good'} handleClick={() => setGood(good+1)} />
        <Button text={'Neutral'} handleClick={() => setNeutral(neutral+1)} />
        <Button text={'Bad'} handleClick={() => setBad(bad+1)} />
      </div>

      <h2>Statistics</h2>
      <div>
        <p>Good: {good}</p>
        <p>Neutral: {neutral}</p>
        <p>Bad: {bad}</p>
      </div>
    </div>
  )
}

export default App