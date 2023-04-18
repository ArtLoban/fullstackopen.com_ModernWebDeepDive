
const Country = ({ country }) => {
  if (!country) return null

  return (
    <div>
      <h1>{country?.name?.common}</h1>
      <div>Capital {country?.capital}</div>
      <div>Area {country?.area}</div>

      <p><b>Languages:</b></p>
      <ul>
        {Object.values(country?.languages).map(lang => <li key={lang}>{lang}</li>)}
      </ul>

      <div>
        <img src={country?.flags?.png} width="100" height="100" alt="flag" />
      </div>
    </div>
  )
}

export default Country