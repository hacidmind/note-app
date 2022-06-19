import Navbar from './Navbar'

const Layout = ({ children }) => (
    <>
        <Navbar />
        {children}
    </>
)

export default Layout;