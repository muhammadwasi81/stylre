import { useLocation } from 'react-router-dom'

const Footer = () => {
  const location = useLocation()
  return (
    <footer
      className="bg-dark text-white text-center py-4"
      style={{
        position: location.pathname === '/Info' ? '' : 'absolute',
        width: '100%',
        bottom: 0,
      }}
    >
      &copy; All rights reserved | stylre {new Date().getFullYear()}
    </footer>
  )
}

export default Footer
