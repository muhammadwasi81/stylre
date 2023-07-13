const Footer = () => {
  return (
    <footer
      className="bg-dark text-white text-center py-4"
      style={{
        position: 'fixed',
        width: '100%',
        bottom: 0,
      }}
    >
      &copy; All rights reserved | style {new Date().getFullYear()}
    </footer>
  )
}

export default Footer
