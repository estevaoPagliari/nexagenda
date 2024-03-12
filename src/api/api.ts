import axios from 'axios'

export const api = axios.create({
  // baseURL: 'https://nexagendaserve.onrender.com',
  baseURL: 'http://192.168.1.104:8080',
})
