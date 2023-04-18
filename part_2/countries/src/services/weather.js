import axios from 'axios'

const fetchWeather = (city) => {
  const appid = process.env.REACT_APP_WEATHER_API_KEY

  return axios
  .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appid}&units=metric`)
  .then(response => response.data)
  .catch(e => {
    console.log(`Error Caught: ${e.message}`);
  })
}

export default fetchWeather