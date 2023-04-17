const Countries = ({ countries, term }) => {
  if (countries === null) return null

  if (term.trim().length < 1) {
    return <p>...start typing country name</p>
  }

  const countryList = countries.filter(country => {
    return country.name.common.toLowerCase().indexOf(term.trim().toLowerCase()) !== -1
  })

  if (countryList.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }

  const renderCountry = () => {
    const country = countryList[0];

    return (
      <>
        <h1>{country.name.common}</h1>
        <div>Capital {country.capital}</div>
        <div>Area {country.area}</div>

        <p><b>Languages:</b></p>
        <ul>
          {Object.values(country.languages).map(lang => <li key={lang}>{lang}</li>)}
        </ul>

        <div>
          <img src={country.flags.png} width="100" height="100" alt="flag" />
        </div>
      </>
    )
  }

  const renderCountries = () => {
    return countryList.map(country => <div key={country.name.common}>{country.name.common}</div>)
  }

  return (
    <div>
      { countryList.length === 1 ? renderCountry() : renderCountries() }
    </div>
  )
}

export default Countries