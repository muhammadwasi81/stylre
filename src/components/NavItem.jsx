import PropTypes from 'prop-types'
import { Box, Button, ListItem } from '@mui/material'
import { Link, useLocation } from 'react-router-dom'

export const NavItem = (props) => {
  const { href, icon, title, ...others } = props
  const location = useLocation()
  const active = location.pathname === href
  // console.log(active, 'active')
  // console.log({ href })
  return (
    <ListItem
      disableGutters
      sx={{
        display: 'flex',
        mb: 0.5,
        py: 0,
        px: 2,
      }}
      {...others}
    >
      <Button
        startIcon={icon}
        disableRipple
        sx={{
          backgroundColor: active && '#F3F4F6',
          borderRadius: 1,
          color: active ? '#FF7009' : '#000',
          fontWeight: active && 'fontWeightBold',
          justifyContent: 'flex-start',
          px: 3,
          textAlign: 'left',
          width: '100%',
          textTransform: 'none',
          '& .MuiButton-startIcon': {
            color: active ? '#FF7009' : '#000',
          },
          '&:hover': {
            backgroundColor: '#F3F4F6',
          },
        }}
      >
        <Link to={href} style={{ textDecoration: 'none', color: 'inherit' }}>
          <Box sx={{ flexGrow: 1 }}>{title}</Box>
        </Link>
      </Button>
    </ListItem>
  )
}

NavItem.propTypes = {
  href: PropTypes.string,
  icon: PropTypes.node,
  title: PropTypes.string,
}
