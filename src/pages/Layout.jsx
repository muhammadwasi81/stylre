import { Helmet } from 'react-helmet'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

const Layout = ({ children, title }) => {
  return (
    <>
      <Helmet>
        <title>{`Stylre - ${title}`}</title>
      </Helmet>
      <Nav />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default Layout
