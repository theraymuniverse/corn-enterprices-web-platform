import React from 'react'
import Nav from './Nav'
import Footer from './footer'
import { Link } from 'react-router-dom'

const ContactPage = () => {
  return (
    <div>
    <Nav/>
    <div className='bg-[#F3FFF1]'>
        
        <div className='pt-[60px] justify-center items-center md:pt-[150px]  pb-[150px]'>
         <h3 className='text-center text-[28px] md:text-[50px] font-bold'>
           Order Now!
         </h3> 
         <p className='text-center md:text-[20px] text-[12px] px-[10px]  pt-[20px]'>
          Order now by contacting us on Whatsapp or choose from our different products in the products page 
         </p>
         <div className='text-center mt-[40px] justify-center items-center flex gap-5 md:gap-10'>
         <Link to="/products"><button className='md:px-[25px] px-[15px] py-[15px] md:py-[15px] hover:bg-green-700 cursor-pointer rounded-lg bg-green-500'>
           Products
         </button></Link>
         <a href="https://wa.me/2348131906385" className='md:px-[25px] px-[15px] py-[15px] hover:bg-green-700 cursor-pointer md:py-[15px] rounded-lg bg-green-500'>
            Chat us on Whatsapp
         </a>
         </div>
        </div>
        <Footer/>
    </div>
    </div>
  )
}

export default ContactPage