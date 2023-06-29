import axios from 'axios'

const API_URL = '/api/users/'
console.log(`${API_URL}signup`, 'API_URL')
const registerService = async (userData) => {
  const response = await axios.post(`${API_URL}signup`, userData)
  console.log(response.data, 'response.data')
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  return response.data
}

const loginService = async (userData) => {
  const response = await axios.post(`${API_URL}login`, userData)
  console.log(response.data, 'response.data')
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  return response.data
}

// Logout user
const logoutService = () => {
  localStorage.removeItem('user')
}

const authService = {
  registerService,
  logoutService,
  loginService,
}

export default authService
