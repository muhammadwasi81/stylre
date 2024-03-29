import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
  loginAction,
  reset,
  setAdditionalUserInfo,
} from '../features/auth/authSlice'
import Logo from '../assets/img/blacklogo.webp'
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineMail,
  AiFillLock,
} from 'react-icons/ai'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { FaSpinner } from 'react-icons/fa'
import { auth, googleProvider } from '../config/firebase'
import { signInWithPopup, signOut } from 'firebase/auth'
import Auth from './Auth'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    showPassword: false,
  })
  const { email, password } = formData
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      const user = result.user
      console.log('firebaseuser=>', user)
      const photoURL = user.photoURL
      const email = user.email
      dispatch(setAdditionalUserInfo({ photoURL, email }))
      navigate('/')
      toast.success('Logged in successfully')
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [user, navigate])

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    return () => {
      dispatch(reset())
    }
  }, [isError, message, dispatch])

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const togglePassword = () => {
    setFormData((prevState) => ({
      ...prevState,
      showPassword: !prevState.showPassword,
    }))
  }
  const onSubmit = (e) => {
    e.preventDefault()
    if (!email || !password) {
      return toast.error('Please fill all the fields')
    }
    const payload = {
      email,
      password,
    }
    console.log(payload, 'payload')
    dispatch(loginAction(payload))
      .then((res) => {
        console.log(res, 'res')
        res.type === 'auth/login/fulfilled' &&
          toast.success(
            res.payload.isAdmin
              ? 'Admin Login successfully'
              : 'User Login successfully'
          )
      })
      .catch(() => {
        toast.error('Something went wrong')
      })
    isSuccess &&
      formData({
        email: '',
        password: '',
      })
  }
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>{`Stylre - Login`}</title>
        </Helmet>
      </HelmetProvider>
      <div className="login-wrapper">
        <section className="container login-container">
          <div className="d-flex justify-content-center mb-3">
            <img
              src={Logo}
              alt="logo"
              className="img-fluid mt-5"
              style={{ width: '250px', height: '200px', cursor: 'pointer' }}
            />
          </div>
          {<Auth signInWithGoogle={signInWithGoogle} />}
          <form onSubmit={onSubmit}>
            <h1 className="text-center fw-bolder mb-3 ">Sign In</h1>
            <div className="form-group icon-input">
              <label className="form-label fw-bolder " htmlFor="email">
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
                <AiOutlineMail className="icon" />
              </label>
            </div>
            <div className="form-group icon-input">
              <label className="form-label fw-bolder " htmlFor="password">
                Password
                <input
                  type={formData.showPassword ? 'text' : 'password'}
                  className="form-control"
                  id="password"
                  name="password"
                  value={password}
                  placeholder="Enter your password"
                  onChange={handleChange}
                />
                <AiFillLock className="icon" />
                <span className="password-icon" onClick={togglePassword}>
                  {formData.showPassword ? (
                    <AiOutlineEye />
                  ) : (
                    <AiOutlineEyeInvisible />
                  )}
                </span>
              </label>
            </div>
            <button
              type="submit"
              className="btn btn-primary w-50"
              disabled={isLoading}
            >
              {isLoading ? <FaSpinner /> : 'Login'}
            </button>
            <div>
              <p className="text-center  mt-3">
                Don't have an account?{' '}
                <Link
                  to="/register"
                  className="text-decoration-none text-primary"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </section>
      </div>
    </>
  )
}

export default Login
