const Header = ({ course }) => {
  return <h1>{course}</h1>
}

const Part = ({ name, number }) => {
  return <p>{name} {number}</p>
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(({name, exercises}) => <Part name={name} number={exercises} />)}
    </div>
  )
}

const Total = ({ sum }) => {
  return <p>Number of exercises {sum}</p>
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course} />
      <Content parts={[part1, part2, part3]}/>
      <Total sum={part1.exercises + part2.exercises + part3.exercises} />
    </div>
  )
}

export default App