import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost:5000/api/blogs',
})

export const authApi = axios.create({
    baseURL: 'http://localhost:5000/api/auth'
})