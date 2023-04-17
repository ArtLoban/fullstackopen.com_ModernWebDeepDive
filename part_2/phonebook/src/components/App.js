import { useState, useEffect } from 'react'
import axios from 'axios'

import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';

const App = () => {
  const [persons, setPersons] = useState([])
  const [term, newTerm] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then(response => {
      setPersons(response.data)
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