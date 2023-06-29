import React from 'react'

const Footer = () => {
  return (
    <footer
      className="bg-dark text-white text-center py-4"
      style={{ position: 'absolute', width: '100%', bottom: 0 }}
    >
      &copy; All rights reserved | {new Date().getFullYear()}
    </footer>
  )
}

export default Footer
