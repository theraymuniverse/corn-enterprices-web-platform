import React from 'react'
import Nav from './Nav'
import Footer from './footer'

const Page = () => {
  return (
    <div>
        <Nav/>
        <section className='bg-[#F3FFF1] h-[1400px] px-[70px] py-[60px] conatiner'>
        <div className='text-center' >
          <h1 className='text-[35px]'>
            Get a wide variety for grain products 
          </h1>
          <p className='text-[25px] pt-[15px]'>Select the best products the market has to offer.</p>
        </div>
        </section>
        <li>

        </li>
        <footer>
            <Footer/>
        </footer>
    </div>
  )
}

export default Page