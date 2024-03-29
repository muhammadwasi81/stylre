import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Layout from './Layout'
import { Grid, Typography } from '@mui/material'
import location from '../assets/img/location.png'
import { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const Dashboard = () => {
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)
  const [userName, setUserName] = useState('')

  useEffect(() => {
    const auth = getAuth()
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUserName(firebaseUser.displayName)
      } else {
        setUserName('')
      }
    })
    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <Layout title="Dashboard">
      <div className="container" style={{ height: '100vh' }}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={6} md={12}>
            <div>
              <Typography
                variant="h1"
                component="h1"
                className="my-5 fs-1 fw-bolder"
              >
                Hey, {user?.data?.userName || userName}
              </Typography>
              <div>
                <Typography
                  variant="h1"
                  component="h1"
                  className="text-black fw-bolder fs-1 mb-2"
                >
                  Welcome to the world's most{' '}
                  <span className="text-primary">convenient</span> in-store
                  pick-up options.
                </Typography>
                <Typography
                  variant="p"
                  sx={{
                    fontSize: { xs: '.85rem', lg: '1rem' },
                  }}
                >
                  Discover a whole new level of convenience with our exceptional
                  same day delivery in-store pickup, designed to make your
                  shopping experience as effortless as possible.
                </Typography>
                <button
                  className="btn btn-primary w-100 mt-3"
                  onClick={() => navigate('/Info')}
                >
                  Get Started
                </button>
              </div>
            </div>
          </Grid>
          <Grid
            item
            xs={false}
            sm={6}
            md={6}
            lg={6}
            sx={{ display: { xs: 'none', lg: 'block' } }}
          >
            <img
              src={location}
              alt="product-img"
              className="img-fluid"
              style={{ height: '80vh', width: '100%' }}
            />
          </Grid>
        </Grid>
      </div>
    </Layout>
  )
}

export default Dashboard
