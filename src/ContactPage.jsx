import React from 'react'
import Nav from './Nav'
import Footer from './footer'
import { Link } from 'react-router-dom'
import shop from './assets/pol.jpg'
import Slider from './Swiper'

const ContactPage = () => {
  return (
    <div>
    <Nav/>
    <div className='bg-[#F3FFF1]'>
        
        <div className='pt-[30px] justify-center items-center md:pt-[40px]  pb-[50px]'>
         <h3 className='text-center text-[35px] md:text-[50px] lg:text-[60px] font-bold'>
           Order <span className='text-green-500'>Now!</span>
         </h3>
         <p className='
         text-center text-[14px] sm:text-[15px] md:text-[17px] px-7 md:px-0
         '>
        Premium Grains. Seamless Ordering. Nationwide Delivery.
         </p>
         <div className='grid grid-cols-1 md:grid-cols-2  gap-10 md:gap-12 p-15 lg:p-20'>
             <div className=''>
              <h1 className='text-[20px] text-center md:text-left lg:text-[30px] font-semibold pb-[20px]'>
              Looking to buy high-quality grains—fast, fresh, and reliably delivered? <span className='text-green-500'> You're in the right place.</span>
            </h1>
            <p className='lg:pt-[30px] text-[14px] md:text-[16px] '>
              At COR'N ENTERPRISES, we make it easy for individuals, wholesalers, retailers, and organizations to access clean, well-packaged, and affordable grains sourced directly from our farms.
              Whether you're buying for personal use, for your business, or in bulk for distribution, we guarantee consistency, affordability, and satisfaction—every single time.
            </p>
             </div>
              <div className='items-center justify-center flex'>
              <img loading='lazy' src={shop} alt="shop" className='w-[500px] md:h-[350px] rounded-lg' />
            </div>
         </div>
         <div>
           
         </div>
         <div  className='text-center pb-[50px]'>
          <h1 className='lg:text-[50px] text-[35px] md:text-[30px] font-bold pt-[30px] pb-[30px]'>
            Our Products
          </h1>
          <Slider />
         </div>
         <h2 className='text-center text-[30px] md:text-[40px] lg:text-[50px] font-bold pt-[20px] pb-[20px]'>
          Place an order now!!
         </h2>
         <p className='text-center md:text-[20px] text-[12px] px-[10px] font-semibold pt-[20px]'>
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
        <div className='pt-[20px]'>
           <h2 className='text-center text-[25px] md:text-[30px] font-bold'>
            How <span className='text-green-500'>to</span> Order ?
           </h2>
            <div className='grid grid-cols-1 text-center md:grid-cols-2 gap-10 p-10 md:p-10 lg:p-30'>
                <div className='items-center shadow-lg bg-white pb-[40px] rounded-xl justify-center pt-[40px] '>
                  <h1 className='font-bold text-[25px]'>
                    Step <span className='text-green-500'>1</span>
                  </h1>
                  <p className='lg:px-20'>
                     Click the "Product button" – Choose your preferred products and quantities, then cash out.
                  </p>
                </div>
                 <div className='items-center shadow-lg bg-white  pb-[40px] rounded-xl justify-center pt-[40px]'>
                  <h1 className='font-bold  text-[25px]'>
                    Step <span className='text-green-500'>2</span>
                  </h1>
                  <p className='lg:px-20'>
                    Get a Confirmation – Our sales team will reach out within 1 hour to confirm your order and share payment details.
                  </p>
                </div>
                 <div className='items-center shadow-lg bg-white pb-[40px] rounded-xl justify-center pt-[40px]'>
                  <h1 className='font-bold text-[25px]'>
                    Step <span className='text-green-500'>3</span>
                  </h1>
                  <p className='lg:px-20'>
                    Make Payment – Pay securely via bank transfer or payment gateway.
                  </p>
                </div>
                 <div className='items-center shadow-lg bg-white pb-[40px] rounded-xl justify-center pt-[40px]'>
                  <h1 className='font-bold text-[25px]'>
                    Step <span className='text-green-500'>4</span>
                  </h1>
                  <p className='lg:px-20'>
                    Receive Delivery – Sit back and get your grains delivered to your doorstep or business location—fast and safe.
                  </p>
                </div>
            </div>
            <div className='text-center pt-[20px] lg:pt-[30px] p-10'>
              <h1 className='text-[20px] md:text-[25px] pb-[20px] font-bold'>
                So  Let's Get You Started!
              </h1>
              <p className=''>
                👉 Click the "Product " Button below to place your request now.<br/>
                📞 Prefer to order by phone? Click on the "CHAT US ON WhatsApp" Button<br/> 
                📧 Questions? Email us at: <span className='text-green-500'>sales@cornenterprise.com</span><br/>


              </p>
            </div>
            <p className='pt-[50px] pb-[70px] px-[20px] text-center p-10'>
              COR’N ENTERPRISES — Your trusted grain supplier.From our fields to your table or warehouse—clean, affordable, reliable.
            </p>
        </div>
        <Footer/>
    </div>
    </div>
  )
}

export default ContactPage