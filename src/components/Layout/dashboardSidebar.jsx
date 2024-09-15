import { useEffect, useState } from 'react'
import {
  Avatar,
  Button,
  Drawer,
  IconButton,
  Typography,
  useMediaQuery,
} from '@mui/material'
import { Box } from '@mui/system'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../../assets/img/Logo.png'
import PropTypes from 'prop-types'
import LogoutIcon from '@mui/icons-material/Logout'
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded'
import SendRoundedIcon from '@mui/icons-material/SendRounded'
import SubscriptionsRoundedIcon from '@mui/icons-material/SubscriptionsRounded'
import { NavItem } from '../NavItem'
import { useDispatch, useSelector } from 'react-redux'
import { logoutAction, reset } from '../../features/auth/authSlice'
import { adminRoutes, navRoutes } from '../../utils/routes'
import { toast } from 'react-toastify'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'

export const DashboardSidebar = (props) => {
  const { user } = useSelector((state) => state.auth)
  const [email, setEmail] = useState('')
  // console.log(user, 'user in dashboard sidebar')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { open, onClose } = props
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'), {
    defaultMatches: true,
  })

  useEffect(() => {
    const auth = getAuth()
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      // console.log(firebaseUser, 'firebaseUser')
      if (firebaseUser) {
        setEmail(firebaseUser.displayName)
      }
    })
    return () => {
      unsubscribe()
    }
  }, [])

  const handleLogout = () => {
    const auth = getAuth()
    const firebaseUser = auth.currentUser

    if (firebaseUser) {
      signOut(auth)
        .then(() => {
          dispatch(reset())
          navigate('/Login')
          toast.success('Logout successfully')
        })
        .catch((error) => {
          console.error('Error signing out:', error)
          toast.error('Error signing out')
        })
    } else if (user) {
      dispatch(logoutAction()).then((res) => {
        console.log('dispatch', res)
        if (res.type === 'auth/logout/fulfilled') {
          toast.success('Logout successfully')
        } else {
          toast.error('something went wrong')
        }
      })
      dispatch(reset())
      navigate('/Login')
    }
  }

  useEffect(() => {
    if (open) {
      onClose?.()
    }
  }, [])

  const routesToShow =
    (user && user?.isAdmin) || user?.data?.isAdmin ? adminRoutes : navRoutes
  console.log(user)
  const content = (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div>
          <Box sx={{ p: 3 }}>
            <Link to="/">
              <img alt="Logo" src={Logo} className="w-[180px]" />
            </Link>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, ml: 2 }}>
            <Avatar
              src="/path-to-user-image.jpg"
              alt="Angel P."
              sx={{
                width: 50,
                height: 50,
                border: '2px solid #FF7009',
              }}
            />
            <Box sx={{ ml: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {user?.data?.userName}
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{
                  color: '#FF7009',
                  fontWeight: 'medium',
                }}
              >
                {user?.data?.isAdmin ? 'Manager Account' : 'Client Account'}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: 'text.secondary',
                  display: 'block',
                  fontWeight: 500,
                }}
              >
                Style.Re member since April 2024
              </Typography>
            </Box>
          </Box>
        </div>
        <Box sx={{ my: 2 }} />
        <Box sx={{ flexGrow: 1 }}>
          {routesToShow.map((item, index) => (
            <NavItem
              key={index}
              value={item}
              href={item.href}
              icon={item.icon}
              title={item.title}
            />
          ))}
        </Box>
        <Box
          sx={{
            px: 2,
            py: 3,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <IconButton sx={{ color: '#f8931f', mr: 1 }} size="small">
              <FacebookRoundedIcon />
            </IconButton>
            <IconButton sx={{ color: '#f8931f', mr: 1 }} size="small">
              <SendRoundedIcon />
            </IconButton>
            <IconButton sx={{ color: '#f8931f', mr: 1 }} size="small">
              <SubscriptionsRoundedIcon />
            </IconButton>
          </Box>
          <Button
            onClick={handleLogout}
            sx={{ background: '#f8931f', mt: 2 }}
            component="a"
            endIcon={<LogoutIcon />}
            fullWidth
            variant="contained"
          >
            Logout
          </Button>
        </Box>
      </Box>
    </>
  )

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: '#fff',
            color: '#000',
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    )
  }
  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: '#fff',
          color: '#000',
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  )
}

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
}
