
import './App.css'

import {
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router'

import Home from './pages/Home'
import Mercado from './pages/Mercado'
import NFTDetails from './pages/NFTDetails'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import MainLayout from './layouts/MainLayout'

const rootRoute = createRootRoute()

const mainLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'main',
  component: MainLayout,
})

const homeRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: '/',
  component: Home,
})

const mercadoRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: '/mercado',
  component: Mercado,
})

const nftDetailsRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: '/nft/$id',
  component: NFTDetails,
})

const cartRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: '/carrinho',
  component: Cart,
})

const checkoutRoute = createRoute({
  getParentRoute: () => mainLayoutRoute,
  path: '/checkout',
  component: Checkout,
})

const routeTree = rootRoute.addChildren([
  mainLayoutRoute.addChildren([
    homeRoute,
    mercadoRoute,
    nftDetailsRoute,
    cartRoute,
    checkoutRoute,
  ]),
])

const router = createRouter({ routeTree })

function App() {
  return <RouterProvider router={router} />
}

export default App
