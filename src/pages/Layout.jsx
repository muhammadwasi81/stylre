// import { Helmet } from 'react-helmet'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { Helmet, HelmetProvider } from 'react-helmet-async'
const Layout = ({ children, title }) => {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>{`Stylre - ${title}`}</title>
        </Helmet>
        <Nav />
        <main>{children}</main>
        <Footer />
      </HelmetProvider>
    </>
  )
}

export default Layout
