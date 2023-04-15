import { useState } from 'react'

const Button = ({ text, handleClick }) => <button onClick={handleClick}>{text}</button>

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({data}) => {
  const {good, neutral, bad, total, average, positive} = data

  return (
    <div>
      <h2>Statistics</h2>
      {
        (total > 0) ?
        <table>
          <tbody>
            <StatisticLine text="Good" value={good} />
            <StatisticLine text="Neutral" value={neutral} />
            <StatisticLine text="Bad" value={bad} />
            <StatisticLine text="All" value={total} />
            <StatisticLine text="Average" value={average} />
            <StatisticLine text="Positive" value={`${positive} %`} />
          </tbody>
        </table>
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