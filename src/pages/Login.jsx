import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
  registerAction,
  loginAction,
  setAdditionalUserInfo,
  reset,
} from '../features/auth/authSlice'
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineMail,
  AiFillLock,
  AiOutlinePhone,
  AiOutlineUserAdd,
} from 'react-icons/ai'
import { FaSpinner } from 'react-icons/fa'
import { auth, googleProvider } from '../config/firebase'
import { signInWithPopup } from 'firebase/auth'
import SocialSignUpButtons from '../components/SocialSignUpButtons'

const AuthTabs = () => {
  const [activeTab, setActiveTab] = useState('signup')
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    showPassword: false,
    showConfirmPassword: false,
    isChecked: false,
  })

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess) {
      if (activeTab === 'signup') {
        toast.success('User registered successfully')
      } else {
        toast.success(
          user?.isAdmin
            ? 'Admin logged in successfully'
            : 'User logged in successfully'
        )
      }
      navigate('/')
    }

    dispatch(reset())
  }, [isError, isSuccess, message, user, navigate, dispatch, activeTab])

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const togglePassword = (field) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }))
  }

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      const user = result.user
      dispatch(
        setAdditionalUserInfo({ photoURL: user.photoURL, email: user.email })
      )
      navigate('/')
      toast.success('Logged in successfully')
    } catch (err) {
      console.error(err)
      toast.error('Google sign-in failed')
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const {
      userName,
      email,
      phoneNumber,
      password,
      confirmPassword,
      isChecked,
    } = formData

    if (activeTab === 'signup') {
      if ([userName, email, phoneNumber, password, isChecked].includes('')) {
        return toast.error('Please fill all the fields')
      }
      if (password !== confirmPassword) {
        return toast.error('Passwords do not match')
      }
      dispatch(
        registerAction({ userName, email, phoneNumber, password, isChecked })
      )
        .then(() => {
          toast.success('User registered successfully')
          navigate('/')
        })
        .catch(() => {
          toast.error('Registration failed')
        })
    } else {
      if (!email || !password) {
        return toast.error('Please fill all the fields')
      }
      dispatch(loginAction({ email, password }))
        .then((res) => {
          console.log(res, 'ssds')
          if (res.type === 'auth/login/fulfilled') {
            toast.success(
              res.payload.isAdmin
                ? 'Admin logged in successfully'
                : 'User logged in successfully'
            )
            navigate('/')
          }
        })
        .catch((error) => {
          console.log('sasasas', error)
          toast.error(error.message || 'Invalid email or password')
        })
    }
  }

  return (
    <div className="auth-wrapper">
      <div className="flex justify-center items-center">
        <div className="w-full max-w-md bg-white mt-5 rounded-xl shadow-md p-8 h-[90vh] overflow-y-auto scrollbar-hide">
          <div className="flex mb-6">
            <button
              className={`flex-1 py-2 px-4 font-bold rounded-l-lg ${
                activeTab === 'signup'
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
              onClick={() => setActiveTab('signup')}
            >
              Sign up
            </button>
            <button
              className={`flex-1 py-2 px-4 font-semibold rounded-r-lg ${
                activeTab === 'login'
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
              onClick={() => setActiveTab('login')}
            >
              Log In
            </button>
          </div>

          <form onSubmit={onSubmit}>
            <h2 className="text-2xl font-bold mb-6 text-center">
              {activeTab === 'signup' ? 'Create an Account' : 'Sign In'}
            </h2>

            {activeTab === 'signup' && (
              <>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="userName"
                  >
                    Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="userName"
                      name="userName"
                      value={formData.userName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your name"
                    />
                    <AiOutlineUserAdd className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </div>

                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="phoneNumber"
                  >
                    Phone Number
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your phone number"
                    />
                    <AiOutlinePhone className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
              </>
            )}

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                />
                <AiOutlineMail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={formData.showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                />
                <AiFillLock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <button
                  type="button"
                  className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-400"
                  onClick={() => togglePassword('showPassword')}
                >
                  {formData.showPassword ? (
                    <AiOutlineEyeInvisible />
                  ) : (
                    <AiOutlineEye />
                  )}
                </button>
              </div>
            </div>

            {activeTab === 'signup' && (
              <>
                <div className="mb-6">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="confirmPassword"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={formData.showConfirmPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Confirm your password"
                    />
                    <AiFillLock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <button
                      type="button"
                      className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-400"
                      onClick={() => togglePassword('showConfirmPassword')}
                    >
                      {formData.showConfirmPassword ? (
                        <AiOutlineEyeInvisible />
                      ) : (
                        <AiOutlineEye />
                      )}
                    </button>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.isChecked}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          isChecked: e.target.checked,
                        })
                      }
                      className="form-checkbox h-5 w-5 text-blue-600"
                    />
                    <span className="ml-2 text-gray-700 text-sm">
                      I agree to the{' '}
                      <Link
                        to="/terms"
                        className="text-blue-600 hover:underline"
                      >
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link
                        to="/privacy"
                        className="text-blue-600 hover:underline"
                      >
                        Privacy Policy
                      </Link>
                    </span>
                  </label>
                </div>
              </>
            )}

            <button
              type="submit"
              className="w-full bg-black text-white font-semibold py-3 px-4 rounded-full hover:bg-gray-800 transition duration-300 mb-4"
              disabled={isLoading}
            >
              {isLoading ? (
                <FaSpinner className="animate-spin mx-auto" />
              ) : activeTab === 'signup' ? (
                'Sign up'
              ) : (
                'Login'
              )}
            </button>
          </form>

          <div className="flex items-center justify-center w-full">
            <div className="flex-grow h-px bg-gray-300"></div>
            <div className="px-4">
              <span className="text-[#666666] font-semibold">OR</span>
            </div>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>

          <div className="mt-6">
            <SocialSignUpButtons activeTab={activeTab} />
          </div>

          <p className="mt-6 text-xs text-center text-gray-600">
            {activeTab === 'signup' ? (
              <>
                Already have an account?{' '}
                <button
                  onClick={() => setActiveTab('login')}
                  className="text-blue-600 hover:underline"
                >
                  Sign In
                </button>
              </>
            ) : (
              <>
                Don't have an account?{' '}
                <button
                  onClick={() => setActiveTab('signup')}
                  className="text-blue-600 hover:underline"
                >
                  Sign up
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  )
}

export default AuthTabs
