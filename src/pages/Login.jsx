import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { loginAction, reset } from '../features/auth/authSlice'
import Loader from '../components/Loader'
import Layout from './Layout'

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
        <section className="container loginWrapper">
          <h1 className="text-primary">Sign In</h1>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={email}
                placeholder="Enter your email"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <div className="input-group">
                <input
                  type={'password'}
                  className="form-control"
                  id="password"
                  name="password"
                  value={password}
                  placeholder="Enter your password"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="text-end">
              Don't have an account?
              <Link to="/Register" className="text-primary">
                {' '}
                Sign up
              </Link>
            </div>
            <button type="submit" className="btn btn-primary w-100 my-2">
              Login
            </button>
          </form>
        </section>
      </Layout>
    </>
  )
}

export default Login
