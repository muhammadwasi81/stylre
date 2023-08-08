import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { reset } from '../features/auth/authSlice'
import Layout from './Layout'
import { toast } from 'react-toastify'
import { Grid, Typography, Button } from '@mui/material'

const Dashboard = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  useEffect(() => {
    if (!user) {
      window.location.href = '/Login'
    } else {
      navigate('/')
      toast.success('Login Successfully')
    }
    dispatch(reset())
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
                Hey, {user?.data?.userName}
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
              src="https://www.pngitem.com/pimgs/m/522-5229044_e-commerce-store-png-transparent-png.png"
              alt="product-img"
              className="img-fluid"
              style={{
                paddingTop: '20px',
                height: '100%',
              }}
            />
          </Grid>
        </Grid>
      </div>
    </Layout>
  )
}

export default Dashboard
