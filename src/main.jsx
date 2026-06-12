import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider, ScrollRestoration } from 'react-router-dom'
import Page from './Page.jsx'
import Contact from './contact_us.jsx'
import CartPage from './CartPage.jsx'
import ShopContextProvider from './cartContext'
import About from './About.jsx'
import ContactPage from "./ContactPage.jsx"
import PartnerPage from './PartnerPage.jsx'
import Login from './Authenticcation/Login.jsx'
import AuthContextProvider from './Authenticcation/AuthContext.jsx'
import Signup from './Authenticcation/Signup.jsx'
import Verify from './Authenticcation/Verify.jsx'
import Chose from './chose.jsx'
import Password from './Authenticcation/password.jsx'
import Career from './Career.jsx'
import SignOut from './Authenticcation/signout.jsx'
import Admin from './Admin.jsx'

// A tiny wrapper that injects <ScrollRestoration /> into every route
const withScroll = (element) => (
  <>
    <ScrollRestoration getKey={(location) => location.pathname} />
    {element}
  </>
)

const router = createBrowserRouter([
  {
    path: '/',
    element: withScroll(<App />),
    errorElement: <App />,
  },
  {
    path: 'products',
    element: withScroll(<Page />),
  },
  {
    path: 'contact',
    element: withScroll(<Contact />),
  },
  {
    path: 'CartPage',
    element: withScroll(<CartPage />),
  },
  {
    path: 'about',
    element: withScroll(<About />),
  },
  {
    path: 'contact_us',
    element: withScroll(<ContactPage />),
  },
  {
    path: 'partner',
    element: withScroll(<PartnerPage />),
  },
  {
    path: 'login',
    element: withScroll(<Login />),
  },
  {
    path: 'register',
    element: withScroll(<Signup />),
  },
  {
    path: 'verify',
    element: withScroll(<Verify />),
  },
  {
    path: 'chose',
    element: withScroll(<Chose />),
  },
  {
    path: 'password',
    element: withScroll(<Password />),
  },
  {
    path: 'career',
    element: withScroll(<Career />),
  },
  {
    path: 'signout',
    element: withScroll(<SignOut />),
  },
    {
    path: 'admin',
    element: withScroll(<Admin />),
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ShopContextProvider>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </ShopContextProvider>
  </StrictMode>
)