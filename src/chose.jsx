import React from 'react'
import third from './assets/corn.jpg'
import { motion } from 'framer-motion'
import {Link} from 'react-router-dom'

const chose = () => {
  const handleClick = () => {
    window.scrollTo(0, 0);
} 

  return (
    <div className='pt-[10px] p-15 lg:px-[150px]'>
        <div 
        className='text-black'>
          <h1 className='text-center pt-[50px] text-[35px] font-bold px-[10px] leading-[40px]'>
           Why Choose COR'N Enterprises?
          </h1>
     
          <div className='lg:flex-row flex  flex-col '>
            <span className='lg:p-[20px] md:text-[18px] text-[16px] pt-[30px] sm:text-[18px] mt-[20px] lg:md:mt-[100px]'>
               COR'N Enterprises is one of the leading producers of high quality agricultural produce.
               With our aim at mainly grains such as maize,millet, either raw or powered form.
               We prioritize the need of our customers and ensure that we deliver the best quality products.
               COR'N Sources these products for Large, Medium and Small scale businesses. <br/>
               <Link to='/about'><button  onClick={handleClick} className='border ml-[50px] border-green-500 hover:bg-green-900 duration-500 hover:text-white rounded-md cursor-pointer text-center lg:ml-[120px] mt-[30px] justify-center  text-green-500 mt-[20px] px-[30px] py-[15px]'>Learn More</button></Link>            
              
              </span>
            <img src={third} loading='lazy' alt='grain' className='md:w-[2000px] lg:w-[2500px] w-[1400px] lg:h-[450px] h-[350px] z-3 md:h-[550px] pt-[20px] mt-[30px]  md:mt-[40px] ' />
          </div>
        </div>
    </div>
  )
}

export default chose