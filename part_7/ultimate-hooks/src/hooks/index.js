import { useState, useEffect } from 'react';
import axios from 'axios'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => setValue('')

  return {
    type,
    value,
    onChange,
    reset
  }
}

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    axios.get(baseUrl)
      .then((response) => {
        setResources(response.data)
      })
      .catch(e => {
        console.log(e.message);
      })
  }, [baseUrl])

  const create = (resource) => {
    axios.post(baseUrl, resource)
      .then(response => {
        setResources([...resources, response.data])
      })
      .catch(e => {
        console.log(e.message);
      })
  }

  const service = {
    create
  }

  return [
    resources, service
  ]
}
