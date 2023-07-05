import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { loginAction, reset } from '../features/auth/authSlice'
import Loader from '../components/Loader'
import Layout from './Layout'
import Logo from '../assets/img/logo.png'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const { email, password } = formData
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (isSuccess || user) {
      toast.success('User logged in successfully')
      // navigate('/')
      window.location.href = '/'
    }
    return () => {
      dispatch(reset())
    }
  }, [isError, isSuccess, message, user, navigate, dispatch])

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }
  const onSubmit = (e) => {
    e.preventDefault()
    if (!email || !password) {
      return toast.error('Please fill all the fields')
    }
    const userData = {
      email,
      password,
    }
    console.log(userData, 'userData')
    dispatch(loginAction(userData))
    isSuccess &&
      formData({
        email: '',
        password: '',
      })
  }
  return (
    <>
      <Layout title="Login">
        {isLoading && <Loader />}
        <div className="d-flex justify-content-center login__img">
          <img src={Logo} alt="logo" className="img-fluid mt-5" />
        </div>
        <section className="container loginWrapper">
          <form onSubmit={onSubmit}>
            <h1 className="text-start text-black fw-bolder mb-3">Sign In</h1>
            <div className="form-group">
              <label className="form-label fw-bolder" htmlFor="email">
                Email
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={email}
                  placeholder="Enter your email"
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="form-group">
              <label className="form-label fw-bolder" htmlFor="password">
                Password
                <input
                  type={'password'}
                  className="form-control"
                  id="password"
                  name="password"
                  value={password}
                  placeholder="Enter your password"
                  onChange={handleChange}
                />
              </label>
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
            <div>
              <p className="text-center mt-3">
                Don't have an account?{' '}
                <Link
                  to="/register"
                  className="text-decoration-none text-primary"
                >
                  Register
                </Link>
              </p>
            </div>
          </form>
        </section>
      </Layout>
    </>
  )
}

export default Login
