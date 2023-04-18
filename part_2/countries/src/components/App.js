import { useState, useEffect } from 'react'
import fetchCountries from '../services/countries'

import Search from './Search';
import Countries from './Countries';
import Country from './Country';

const App = () => {
  const [countriesData, setCountriesData] = useState(null)
  const [countries, setCountries] = useState(null)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    fetchCountries().then(data => {
      setCountriesData(data)
    })
  }, [])

  return (
    <div>
      <Search countries={countriesData} setCountries={setCountries} setSelected={setSelected} />
      <Countries countries={countries} setSelected={setSelected} />
      <Country country={selected} />
    </div>
  );
}

export default App;
