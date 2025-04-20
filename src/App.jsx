import Nav from './Nav'
import Home from './home'
import Chose from './chose' 
import Product from './Products'
import Partners from './Partners'
import Footer from './footer'
import Contact from './contact_us'
import Ceo from './Ceo'
import Testimonials from './Testimonials'

const App = () => {
  return (
   <div>
      <Nav />
      <Home/>
      <Chose/>
      <Product/>
      <Ceo/>
      <Testimonials/>
      <Partners/>
      <Contact/>
      <Footer/>
   </div>
  )
}

export default App
