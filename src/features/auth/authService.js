import axios from 'axios'

const apiGlobal = axios.create({
  // baseURL: 'http://localhost:8000/api/users/',
  baseURL: 'https://stylre-app.onrender.com/api/users',
})

const registerService = async (userData) => {
  const response = await apiGlobal.post(`/signup`, userData)
  console.log(response.data, 'response.data')
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  return response.data
}

const loginService = async (userData) => {
  const response = await apiGlobal.post(`/login`, userData)
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
