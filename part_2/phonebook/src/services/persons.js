import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

export const getPersons = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

export const createPerson = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

export const updatePerson = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

export const deletePerson = id => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}
