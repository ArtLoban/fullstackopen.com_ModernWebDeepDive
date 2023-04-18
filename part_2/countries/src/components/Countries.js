
const Countries = ({ countries, setSelected }) => {
  if (!countries) {
    return <p>...start typing country name</p>
  }

  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }

  const onCountrySelect = (name) => {
    const found = countries.find(country => {
      return country.name.common === name
    })

    if (typeof found !== 'undefined') {
      setSelected(found)
    }
  }

  const renderCountries = () => {
    return countries.map(country => {
      return (
        <div key={country.name.common}>
          <span style={{marginRight: 10}}>{country.name.common}</span>
          <button onClick={() => onCountrySelect(country.name.common)}>Show</button>
        </div>
      )
    })
  }

  return (
    <div>{renderCountries()}</div>
  )
}

export default Countries