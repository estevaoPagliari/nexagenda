import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://nexagendaserve.onrender.com',
})
