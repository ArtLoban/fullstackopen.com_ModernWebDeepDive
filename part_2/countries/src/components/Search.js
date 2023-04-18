import { useState, useEffect} from 'react';

const Search = ({ countries, setCountries, setSelected }) => {
  const [term, setTerm] = useState('')

  useEffect(() => {
    if (countries && term.trim().length !== 0) {

      const countryList = countries.filter(country => {
        return country.name.common.toLowerCase().indexOf(term.trim().toLowerCase()) !== -1
      })

      setCountries(countryList)

      if (countryList.length === 1) {
        setSelected(countryList[0])
      }
    }

  },[term])

  return (
    <div>
      <span>Find countries</span>
      <input value={term} onChange={(e) => setTerm(e.target.value)} />
    </div>
  )
}

export default Search