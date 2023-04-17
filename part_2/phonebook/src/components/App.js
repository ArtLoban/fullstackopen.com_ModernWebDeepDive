import { useState, useEffect } from 'react'
import { getAll as getPersons } from '../services/persons'

import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';

const App = () => {
  const [persons, setPersons] = useState([])
  const [term, newTerm] = useState('')

  useEffect(() => {
    getPersons().then((data) => {
      setPersons(data)
    })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter term={term} handleChange={newTerm} />

      <h3>Add a new</h3>
      <PersonForm persons={persons} addPerson={setPersons} />

      <h2>Numbers</h2>
      <Persons persons={persons} term={term} />
    </div>
  )
}

export default App