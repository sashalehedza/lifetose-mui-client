import { Suspense, lazy, Fragment } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'

import PrivateRoute from './components/PrivateRoute'
import PrivateRouteAdmin from './components/PrivateRouteAdmin'

const ROUTES = [
  {
    path: '*',
    Layout: Layout,
    routes: [
      {
        path: '/login',
        Component: lazy(() => import('./pages/Login')),
      },
      {
        path: '/register',
        Component: lazy(() => import('./pages/Register')),
      },
      {
        path: '/',
        Component: lazy(() => import('./pages/Home')),
      },
      {
        path: '/posts/search',
        Component: lazy(() => import('./pages/Home')),
      },
      {
        path: '/posts/tag/:tag',
        Component: lazy(() => import('./pages/TagPosts')),
      },
      {
        path: '/cart',
        Component: lazy(() => import('./pages/CartPage')),
      },
      {
        path: '/post/:id',
        Component: lazy(() => import('./pages/SinglePost')),
      },
      {
        path: '/addPost',
        Component: lazy(() => import('./pages/AddEditPost')),
        protected: true,
        admin: true,
      },
      {
        path: '/editPost/:id',
        Component: lazy(() => import('./pages/AddEditPost')),
        protected: true,
        admin: true,
      },
      {
        path: '/dashboard',
        Component: lazy(() => import('./pages/Dashboard')),
        protected: true,
        admin: true,
      },
      {
        path: '/orders',
        Component: lazy(() => import('./pages/Orders')),
        protected: true,
        admin: true,
      },
      {
        path: '/my-orders',
        Component: lazy(() => import('./pages/MyOrders')),
        protected: true,
      },
      {
        path: 'notfound',
        Component: lazy(() => import('./pages/NotFound')),
      },
      {
        path: '*',
        Component: lazy(() => import('./pages/NotFound')),
      },
    ],
  },
]

const renderRoutes = (routes) => {
  return (
    <Suspense fallback={<></>}>
      <Routes>
        {routes.map((route) => {
          const Protected = route.protected ? PrivateRoute : Fragment
          const Admin = route.admin ? PrivateRouteAdmin : Fragment
          const Component = route.Component
          const Layout = route.Layout || Fragment

          return (
            <Route
              path={route.path}
              key={route.path}
              element={
                <Admin>
                  <Protected>
                    <Layout>
                      {route.routes ? (
                        renderRoutes(route.routes)
                      ) : (
                        <Component />
                      )}
                    </Layout>
                  </Protected>
                </Admin>
              }
            />
          )
        })}
      </Routes>
    </Suspense>
  )
}

const RoutesBase = () => renderRoutes(ROUTES)

export default RoutesBase
