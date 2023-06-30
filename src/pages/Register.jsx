import { useState, useEffect } from 'react'
import Layout from './Layout'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { registerAction, reset } from '../features/auth/authSlice'
import Loader from '../components/Loader'

const Register = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  })

  const { userName, email, phoneNumber, password, confirmPassword } = formData
  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (isSuccess || user) {
      toast.success('User registered successfully')
      setTimeout(() => {
        window.location.href = '/'
      }, 2000)
    }
    dispatch(reset())
  }, [dispatch, isSuccess, message, user, isLoading])

  const requiredFields = [
    userName,
    email,
    phoneNumber,
    password,
    confirmPassword,
  ]

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }
  const onSubmit = (e) => {
    e.preventDefault()
    if (requiredFields.some((field) => field === '')) {
      return toast.error('Please fill all the fields')
    }
    if (password !== confirmPassword) {
      return toast.error('Password and confirm password does not match')
    }
    const userData = {
      userName,
      email,
      phoneNumber,
      password,
    }
    dispatch(registerAction(userData))
    isSuccess &&
      setFormData({
        userName: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
      })
  }
  return (
    <Layout title="Register">
      <section className="container loginWrapper">
        <h1 className="text-primary">Sign Up</h1>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="userName"
              name="userName"
              value={userName}
              placeholder="Enter your name"
              onChange={handleChange}
            />
          </div>
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
            <input
              type="number"
              className="form-control"
              id="phoneNumber"
              name="phoneNumber"
              value={phoneNumber}
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              placeholder="111-123-1234"
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
          <div className="form-group">
            <div className="input-group">
              <input
                type={'password'}
                className="form-control"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                placeholder="Enter your confirm password"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="text-end">
            Already have an account?{' '}
            <Link to="/Login" className="text-primary">
              {' '}
              Sign In
            </Link>
          </div>
          <button type="submit" className="btn btn-primary w-100 my-2">
            Register
          </button>
        </form>
      </section>
    </Layout>
  )
}

export default Register
