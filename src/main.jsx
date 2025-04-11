import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Page from './Page.jsx'
import Contact from './contact_us.jsx'
import CartPage from './CartPage.jsx'
import ShopContextProvider from './cartContext'
import About from './About.jsx'
import ContactPage from './contactPage.jsx'
import PartnerPage from './PartnerPage.jsx'
import Login from './Authenticcation/Login.jsx'
import AuthContextProvider from './Authenticcation/AuthContext.jsx'
import Signup from './Authenticcation/Signup.jsx'
import Verify from './Authenticcation/Verify.jsx'
import Chose from './chose.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <App/>,
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
  },{
    path: 'about',
    element: <About/>
  },{
    path: 'contact_us',
    element: <ContactPage/>
  },{
    path: 'partner',
    element: <PartnerPage/>
  },{
    path: 'login',
    element: <Login/>
  },{
    path: 'register',
    element: <Signup/>
  },{
    path: 'verify',
    element: <Verify/>
  },{
    path: 'chose',
    element: <Chose/>
  }
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
