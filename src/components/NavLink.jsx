import { NavLink } from 'react-router-dom'

const ActiveLink = ({ to, children, className }) => {
  return (
    <NavLink
      to={to}
      className={className}
      style={(isActive) => ({
        color: isActive ? 'orange' : 'black',
        fontWeight: isActive ? 'bold' : '',
      })}
    >
      {children}
    </NavLink>
  )
}

export default ActiveLink
