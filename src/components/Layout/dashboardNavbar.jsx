import React from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  useMediaQuery,
} from '@mui/material'
import { styled, useTheme } from '@mui/system'
import { LocationOn, Menu } from '@mui/icons-material'
import SchedulePickupIcon from '../../assets/svg/schedulebuttonIcon'
import CartIcon from '../../assets/svg/cartIcon'

const StyledAppBar = styled(AppBar)({
  backgroundColor: '#ffffff',
  color: 'black',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
})

const Logo = styled(Typography)({
  fontWeight: 'bold',
  fontSize: '1.5rem',
  color: '#ff6600',
})

const LocationButton = styled(Button)({
  color: 'black',
  borderRadius: '20px',
  border: '1px solid #e0e0e0',
  padding: '6px 16px',
  textTransform: 'none',
})

const ScheduleButton = styled(Button)({
  backgroundColor: '#ff6600',
  color: 'white',
  borderRadius: '20px',
  padding: '6px 16px',
  '&:hover': {
    backgroundColor: '#e65c00',
  },
})

const CartButton = styled(IconButton)({
  backgroundColor: '#e0e0e0',
  color: 'black',
  padding: '8px',
})

const DashboardNavbar = ({ onSidebarOpen }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'))

  return (
    <StyledAppBar position="fixed">
      <Toolbar>
        <IconButton
          color="inherit"
          onClick={onSidebarOpen}
          sx={{ mr: 2, display: { lg: 'none' } }}
        >
          <Menu />
        </IconButton>
        <Logo variant="h6">
          style.<span style={{ color: '#ff6600' }}>re</span>
        </Logo>
        <Box sx={{ flexGrow: 1 }} />
        {!isMobile && (
          <LocationButton
            startIcon={<LocationOn />}
            sx={{ mr: 1, display: { xs: 'none', md: 'flex' } }}
          >
            {isTablet ? '2992 Isabella...' : '2992 Isabella Circle'}
          </LocationButton>
        )}
        {!isMobile && (
          <ScheduleButton
            variant="contained"
            sx={{ mx: 1, display: { xs: 'none', md: 'flex' } }}
          >
            <SchedulePickupIcon /> &nbsp;{' '}
            {isTablet ? 'Schedule' : 'Schedule a Pickup'}
          </ScheduleButton>
        )}
        <CartButton sx={{ display: { xs: 'none', sm: 'flex' } }}>
          <CartIcon />
        </CartButton>
      </Toolbar>
    </StyledAppBar>
  )
}

export default DashboardNavbar
