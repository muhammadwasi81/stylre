import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { reset } from '../features/auth/authSlice'
import Layout from './Layout'

const Dashboard = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  useEffect(() => {
    if (!user) {
      navigate('/login')
    } else {
      navigate('/dashboard')
    }
    return () => {
      dispatch(reset())
    }
  }, [user, navigate, dispatch])

  return (
    <Layout title="Dashboard">
      <section className="container">
        <h1 className="my-5">
          welcome to the Dashboard {user?.data?.userName}
        </h1>
      </section>
    </Layout>
  )
}

export default Dashboard
