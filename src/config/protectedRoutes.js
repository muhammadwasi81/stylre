import { Route, Navigate } from 'react-router-dom'

const isUserAuthenticated = () => {
  const token = localStorage.getItem('token')
  return !!token
}

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isUserAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Navigate to="/login" />
      )
    }
  />
)

export default ProtectedRoute
