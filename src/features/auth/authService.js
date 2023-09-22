import axios from 'axios'

const apiGlobal = axios.create({
  // baseURL: 'http://localhost:8000/api/users',
  baseURL: 'https://stylere.onrender.com//api/users',
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

const getUserById = async (id) => {
  const userData = JSON.parse(localStorage.getItem('user'))
  const token = userData.data.token
  console.log(token, 'token')
  const response = await apiGlobal.get(`/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  console.log(response.data, 'response.data.service')
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
  getUserById,
}

export default authService
