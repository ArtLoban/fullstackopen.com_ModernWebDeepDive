import { useState, useEffect } from 'react'
import fetchCountries from '../services/countries'

import Search from './Search';
import Countries from './Countries';

const App = () => {
  const [countries, setCountries] = useState(null)
  const [term, setTerm] = useState('')

  useEffect(() => {
    fetchCountries().then(data => {
      setCountries(data)
    })
  }, [])

  return (
    <div>
      <Search term={term} setTerm={setTerm} />
      <Countries countries={countries} term={term} />
    </div>
  );
}

export default App;
