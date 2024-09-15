import { useState } from 'react'
import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'
import DashboardNavbar from './dashboardNavbar'
import { DashboardSidebar } from './dashboardSidebar'

const DashboardLayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  paddingTop: 64,
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 300,
  },
}))

export const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false)

  const handleSidebarOpen = () => {
    setSidebarOpen(true)
  }

  const handleSidebarClose = () => {
    setSidebarOpen(false)
  }

  return (
    <>
      <DashboardNavbar onSidebarOpen={handleSidebarOpen} />
      <DashboardSidebar onClose={handleSidebarClose} open={isSidebarOpen} />
      <DashboardLayoutRoot>
        <Box
          sx={{
            display: 'flex',
            flex: '1 1 auto',
            flexDirection: 'column',
            width: '100%',
          }}
        >
          {children}
        </Box>
      </DashboardLayoutRoot>
    </>
  )
}

export default DashboardLayout
