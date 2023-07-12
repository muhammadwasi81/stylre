import { useState, useEffect } from 'react'
import Layout from './Layout'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { registerAction, reset } from '../features/auth/authSlice'
import Loader from '../components/Loader'

const Register = () => {
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
    isChecked: false,
  })

  const { userName, email, phoneNumber, password, confirmPassword, isChecked } =
    formData
  useEffect(() => {
    if (isError) {
      return toast.error(message)
    }
    if (isSuccess || user) {
      toast.success('User registered successfully')
      setTimeout(() => {
        window.location.href = '/'
      }, 2000)
      return
    }
    dispatch(reset())
  }, [dispatch, isSuccess, message, user, isLoading])

  const requiredFields = [userName, email, phoneNumber, password, isChecked]

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }
  const onSubmit = (e) => {
    e.preventDefault()
    if (requiredFields.includes('')) {
      return toast.error('Please fill all the fields')
    }
    if (password !== confirmPassword) {
      return toast.error('Password and confirm password does not match')
    }

    // const phoneRegex = /^\d{3}-\d{3}-\d{4}$/
    // if (!phoneNumber.match(phoneRegex)) {
    //   return toast.error(
    //     'Please enter a valid phone number in the format 111-123-4567'
    //   )
    // }

    // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])/
    // if (!password.match(passwordRegex)) {
    //   return toast.error(
    //     'Password must include at least one uppercase and one lowercase letter'
    //   )
    // }

    const userData = {
      userName,
      email,
      phoneNumber,
      password,
      isChecked,
    }
    console.log(userData)
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
      {isLoading && <Loader />}
      <section className="container signupWrapper">
        <form onSubmit={onSubmit}>
          <h1 className="text-black fw-bolder">Create an Account</h1>
          <p className="text-black fw-normal">
            The faster you sign up, the faster you get the goods.
          </p>
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
              placeholder="111-123-1234"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
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
          <div className="form-group">
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
          <div className="form-group">
            <input
              className="form-check-input"
              type="checkbox"
              checked={isChecked}
              onChange={(e) =>
                setFormData({ ...formData, isChecked: !isChecked })
              }
              id="flexCheckDefault"
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              &nbsp;I agree to the{' '}
              <Link to="/terms" className="text-decoration-none text-primary">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="text-decoration-none text-primary">
                Privacy Policy
              </Link>
            </label>
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100 my-2"
            disabled={!isChecked}
          >
            Register
          </button>
          <div className="text-center">
            Already have an account?{' '}
            <Link to="/Login" className="text-decoration-none text-primary">
              {' '}
              Sign In
            </Link>
          </div>
        </form>
      </section>
    </Layout>
  )
}

export default Register
