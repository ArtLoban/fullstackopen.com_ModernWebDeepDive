import {useState} from 'react';
import { createPerson, updatePerson } from '../services/persons'

const PersonForm = ({ persons, updatePersons, setMessage }) => {
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')

  const onFormSubmit = (e) => {
    e.preventDefault()

    const trimmedName = name.trim();
    const trimmedPhone = number.trim();

    if (trimmedName.length === 0 || trimmedPhone.length === 0) {
      setMessage({
        body: `Field cannot be empty`,
        status: 'error'
      })
      return null
    }

    const found = persons.find(person => person.name === trimmedName);

    if (typeof found === 'undefined') {
      createPerson({
        name: trimmedName,
        number: trimmedPhone
      }).then(newPerson => {
        updatePersons([...persons, newPerson])

        setMessage({
          body: `Added ${newPerson.name}`,
          status: 'success'
        })

        resetInputs()
      })
      .catch(error => {
        console.log('error.response.data.error: ', error.response.data.error);

        setMessage({
          body: error.response?.data?.error || 'Validation Error',
          status: 'error',
          duration: 5000
        })
      })

      return
    }

    if (found.number === trimmedPhone) {
      alert(`${trimmedName} is already added to phonebook`)
      return
    }

    if (!window.confirm(`${trimmedName} is already added to phonebook. Replace the old number with a new one?`)) {
      return
    }

    updatePerson(found.id, {...found, number:trimmedPhone })
      .then(updatedPerson => {
        updatePersons(persons.map(person => person.id !== found.id ? person : updatedPerson))

        setMessage({
          body: `${updatedPerson.name} updated`,
          status: 'success'
        })

        resetInputs()
      })
      .catch(e => {
        updatePersons(persons.filter(person => person.id !== found.id))
        setMessage({
          body: `Information of ${found.name} has already removed from server`,
          status: 'error'
        })
        console.error(`Server response: ${e.message}`);
      })
  }

  const resetInputs = () => {
    setName('')
    setNumber('')
  }

  return (
    <form onSubmit={onFormSubmit}>
      <div>
        <div>
          name: <input value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div>
          number: <input value={number} onChange={e => setNumber(e.target.value)} />
        </div>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm