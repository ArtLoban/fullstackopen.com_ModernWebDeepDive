import axios from 'axios'

const fetchCountry = (name) => {
  let result = {
    found: false,
  }

  return axios
    .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
    .then(response => {
      return handleCountryResponse(response.data)
    })
    .catch(e => {
      return result
    })
}

export default fetchCountry

const handleCountryResponse = (response) => {
  if (response.name?.common) {
    return {
      found: true,
      data: {
        name: response.name.common,
        capital: response.capital[0],
        population: response.population,
        flag: response.flags.png,
      }
    }
  }

  return false
}