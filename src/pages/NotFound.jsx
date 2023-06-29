import { Link } from 'react-router-dom'
import Layout from './Layout'

const NotFound = () => {
  return (
    <Layout title="Page Not Found">
      <div className="d-flex flex-column align-items-center justify-content-center mt-5 pt-5">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <Link to="/">Go Back Home</Link>
      </div>
    </Layout>
  )
}

export default NotFound
