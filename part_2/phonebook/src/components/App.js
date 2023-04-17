import { useState, useEffect } from 'react'
import { getPersons } from '../services/persons'

import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';
import Notification from './Notification';

const App = () => {
  const [persons, setPersons] = useState([])
  const [term, newTerm] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    getPersons().then((data) => {
      setPersons(data)
    })
  }, [])

  return (
    <div>
      <Notification message={message} setMessage={setMessage} />
      <h2>Phonebook</h2>
      <Filter term={term} handleChange={newTerm} />

      <h3>Add a new</h3>
      <PersonForm persons={persons} updatePersons={setPersons} setMessage={setMessage} />

      <h2>Numbers</h2>
      <Persons persons={persons} term={term} updateData={setPersons} setMessage={setMessage} />
    </div>
  )
}

export default App