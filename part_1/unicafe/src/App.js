import { useState } from 'react'

const Button = ({ text, handleClick }) => <button onClick={handleClick}>{text}</button>

const Statistics = ({data}) => {
  const {good, neutral, bad, total, average, positive} = data

  return (
    <div>
      <h2>Statistics</h2>
      {
        (total > 0) ?
        <div>
          <p>Good: {good}</p>
          <p>Neutral: {neutral}</p>
          <p>Bad: {bad}</p>
          <hr/>
          <p>All: {total}</p>
          <p>Average: {isNaN(average) ? 0 : average}</p>
          <p>Positive: {isNaN(positive) ? 0 : positive}%</p>
        </div>
        :
        <div>No feedback given</div>
      }
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const total = good + neutral + bad;
  const average = (good - bad) / total;
  const positive = (good / total * 100);

  return (
    <div>
      <h1>Give feedback</h1>
      <div>
        <Button text="Good" handleClick={() => setGood(good+1)} />
        <Button text="Neutral" handleClick={() => setNeutral(neutral+1)} />
        <Button text="Bad" handleClick={() => setBad(bad+1)} />
      </div>
      <Statistics data={{good, neutral, bad, total, average, positive}} />
    </div>
  )
}

export default App