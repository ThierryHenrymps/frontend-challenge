import { Outlet } from '@tanstack/react-router'
import Header from '../components/Header'
import Footer from '../components/Footer'

function MainLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default MainLayout