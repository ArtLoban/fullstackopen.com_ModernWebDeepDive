import axios from 'axios'

const fetchCountries = () => {
  return axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => response.data)
    .catch(e => {
      console.log(`Error Caught: ${e.message}`);
    })
}

export default fetchCountries