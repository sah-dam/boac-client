import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Outlet } from "react-router"
import './index.css'
import Dashboard from './dashboard.jsx'
import Home from './home.jsx'
import PayTransferComponent from './pay-transfer.jsx'
import FdicBanner from './fdic-banner.jsx'
import Header from './header.jsx'
import LoginPage from './admin/login.jsx'
import AdminDash from './admin/dashboard.jsx'

// Layout with FdicBanner for ALL routes
function Layout() {
  return (
    <>
      <FdicBanner />
      <Outlet />
    </>
  )
}

// Layout with the additional component for routes except "/"
function PrimaryHeader() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />, // Only FdicBanner, no YourOtherComponent
      },
      {
        element: <PrimaryHeader />, // Nested layout
        children: [
          {
            path: "/myaccounts",
            element: <Dashboard />,
          },
          {
            path: "/pay-transfer-pay-portal",
            element: <PayTransferComponent />,
          }
        ]
      }
    ]
  },
  { 
    path: '/adminbackendverifiedaccessonly',
    children: [
      {
        path: "login", // Removed leading slash
        element: <LoginPage />
      },
      {
        path: "dashboard", // Removed leading slash
        element: <AdminDash />
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)