import axios from 'axios';

export const _axios = axios.create({
  baseURL: 'http://127.0.0.1:3333', // Your AdonisJS backend URL
  headers: {
    'Content-Type': 'application/json',
  },
})