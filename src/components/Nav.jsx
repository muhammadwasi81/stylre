import { useDispatch, useSelector } from 'react-redux'
import { navRoutes } from '../utils/routes'
import { Link, useNavigate } from 'react-router-dom'
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { logoutAction, reset } from '../features/auth/authSlice'

const Nav = () => {
  const { user } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  console.log(user, 'user in nav')

  const onLogout = () => {
    dispatch(logoutAction())
    dispatch(reset())
    navigate('/')
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link to="/">
          <img
            src={'http://stylere.co/img/logo_2x.png'}
            alt="logo"
            className="img-fluid"
            style={{ width: '100px' }}
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
            {user ? (
              <>
                {navRoutes.map((route) => (
                  <li className="nav-item" key={route.id}>
                    <Link className="nav-link" to={route.path}>
                      {route.name}
                    </Link>
                  </li>
                ))}
                <li className="nav-item">
                  <button className="btn btn-danger" onClick={onLogout}>
                    <FaSignOutAlt className="ml-auto" /> Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <div className="d-flex justify-content-end ml-auto">
                  <li className="nav-item">
                    <Link to="/Login" className="btn btn-primary me-2">
                      <FaSignInAlt className="me-2" /> Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/register" className="btn btn-secondary">
                      <FaUser className="me-2" /> Register
                    </Link>
                  </li>
                </div>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav
