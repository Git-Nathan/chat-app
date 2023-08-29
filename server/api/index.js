import axios from 'axios'

export const Api = axios.create({ baseURL: process.env.HARPERDB_URL })

Api.interceptors.request.use((config) => {
  config.headers.Authorization = process.env.HARPERDB_PW
  config.headers['Content-Type'] = 'application/json'
  return config
})
