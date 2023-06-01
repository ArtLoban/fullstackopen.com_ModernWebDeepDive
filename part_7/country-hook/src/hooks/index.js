import {useEffect, useState} from 'react';
import fetchCountry from '../services/countries'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if (name.trim().length > 0) {
      fetchCountry(name).then(res => {
        setCountry(res)
      })
    }
  }, [name])

  return country
}
