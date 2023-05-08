import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async blogData => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, blogData, config)
  return response.data
}

const update = async blogData => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.put(`${baseUrl}/${blogData.id}`, blogData, config)
  return response.data
}

const remove = async id => {
  const config = {
    headers: { Authorization: token },
  }

  const request = axios.delete(`${baseUrl}/${id}`, config)
  return request.then(response => response.data)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll,
  create,
  update,
  remove,
  setToken
}
