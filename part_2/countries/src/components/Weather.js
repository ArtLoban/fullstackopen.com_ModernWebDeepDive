import { useState, useEffect } from 'react'
import fetchWeather from '../services/weather'

const Weather = ({ country }) => {
  const [weather, serWeather ] = useState(null)

  useEffect(() => {
    if (country?.name?.common) {
      fetchWeather(country?.name?.common).then(data => {
        serWeather(data)
      })
    }
  },[country])

  if (!country || !weather) return null

  const getImage = (icon) => {
    return <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="weather icon"/>
  }

  return (
    <div>
      <h2>Weather in {country?.name?.common}</h2>
      <div>
        <p>Temperature {weather?.main?.temp} Celsius</p>
        {getImage(weather?.weather?.[0].icon)}
        <p>Wind {weather?.wind?.speed} m/s</p>
      </div>

    </div>
  )
}

export default Weather