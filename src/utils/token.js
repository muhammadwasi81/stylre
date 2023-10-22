import axios from 'axios'

const getAuthToken = () => {
  const userData = JSON.parse(localStorage.getItem('user'))
  console.log(userData, 'userData')
  return userData?.accessToken || ''
}

const apiPrefix = axios.create({
  baseURL: 'https://stylere.onrender.com/api/',
})

apiPrefix.interceptors.request.use(function (config) {
  const token = getAuthToken()
  console.log(token, 'tokenAPI')
  config.headers.Authorization = token ? `Bearer ${token}` : ''
  return config
})

apiPrefix.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    console.log(error.response, 'error.response')
    if (error.response && error.response.status === 401) {
      console.log('401 error')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)
export default apiPrefix
