import axios from 'axios'
const baseUrl = '/api/users'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getUser = async id => {
  const request = axios.get(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

export default {
  getAll,
  getUser
}
