const Part = ({ name, exercises}) => {
  return <p>{name} {exercises}</p>
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises} />)}
    </div>
  )
}

const Header = ({ title }) => {
  return (
    <h1>{title}</h1>
  )
}

const Footer = ({ parts }) => {
  const total = parts.reduce((accumulator, part) => {
    return accumulator + part.exercises
  }, 0)

  return (
    <div>
      <b>total of {total} exercises</b>
    </div>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header title={course.name} />
      <Content parts={course.parts} />
      <Footer parts={course.parts} />
    </div>
  )
}

export default Course;