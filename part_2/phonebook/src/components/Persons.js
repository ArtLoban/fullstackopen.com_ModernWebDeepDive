const Persons = ({ persons, term }) => {
  if (term.trim().length > 0) {
    persons = persons.filter(person => {
      return person.name.toLowerCase().indexOf(term.trim().toLowerCase()) !== -1
    })
  }

  return persons.map((person, i) => {
    return <p key={person.name + i}>{person.name} {person.phone}</p>
  })
}

export default Persons