import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Page from './Page.jsx'
import Contact from './contact_us.jsx'
import CartPage from './CartPage.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: 'products',
    element: <Page />,
  },{
    path: 'contact',
    element: <Contact />
  },{
    path: 'CartPage',
    element: <CartPage/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
