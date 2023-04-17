import { deletePerson } from '../services/persons'

const Persons = ({ persons, term, updateData }) => {
  if (term.trim().length > 0) {
    persons = persons.filter(person => {
      return person.name.toLowerCase().indexOf(term.trim().toLowerCase()) !== -1
    })
  }

  const handleDelete = (id) => {
    const person = persons.find(( person) =>  person.id === id)

    if (typeof person === 'undefined') {
      alert('Wrong record ID')
      return
    }

    if (!window.confirm(`Delete ${person.name}`)) return

    deletePerson(id).then(() => {
      updateData(persons.filter(person => person.id !== id))
    })
  }

  return persons.map((person, i) => {
    return (
      <p key={person.name + i}>
        <span>{person.name} {person.number}</span>
        <button onClick={() => handleDelete(person.id)}>Delete</button>
      </p>
    )
  })
}

export default Persons