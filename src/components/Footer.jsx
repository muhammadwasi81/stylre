const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center py-4">
      &copy; {new Date().getFullYear()}{' '}
      <span style={{ color: 'var(--primary)' }}>stylre</span>. All rights
      reserved.
    </footer>
  )
}

export default Footer
