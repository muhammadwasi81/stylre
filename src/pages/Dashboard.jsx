import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { reset } from '../features/auth/authSlice'
import Layout from './Layout'

const Dashboard = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  console.log(user, 'user')
  useEffect(() => {
    if (!user) navigate('/Login')

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, dispatch])

  return (
    <Layout title="Dashboard">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla tenetur hic
      voluptatum quos debitis nostrum quasi explicabo consequatur et natus iure
      libero officiis, minima maxime eum deleniti. Tenetur, voluptates id?
    </Layout>
  )
}

export default Dashboard
