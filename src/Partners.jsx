import React from 'react'
import fourth from './assets/pp.jpg'
import partner from './assets/partner.png'
import Marquee from "react-fast-marquee";
import {Link} from 'react-router-dom'

const Partners = () => {
  const handleClick = () => {
    window.scrollTo(0, 0);
} 
  return (
    <div className=' mt-[30px] py-[100px] justify-self-center items-center lg:px-[200px] md:p-[5px]'>
        <div className='flex md:flex-row flex-col gap-20 lg:gap-50'>
        <span className='md:w-[500px] px-[30px] w-[300px]'>
        <h1 className='text-[40px] md:text-[40px] lg:text-[50px] font-bold ' >
            Partner/Invest in <br/> COR'N Enterprises.
        </h1>
        <p className='md:text-[20px] mt-[20px]'>
                Join forces with our company trusted by over 1000+ customers.
                Become an accredited partner or noble investor to our services today. 
            </p>
            <Link to='/partner'> <button onClick={handleClick} className='border hover:bg-green-900 duration-500 hover:text-white border-green-500 rounded-md cursor-pointer text-center justify-center space-y-[20px] text-green-500 mt-[20px] px-[30px] py-[15px]'>
            Join Now</button></Link>
         </span>
        <img loading='lazy' className= 'px-[5px] md:px-[0px] h-[470px] w-full md:w-[450px] md:h-[550px] rounded-2xl shadow-2xl ' src={fourth} />
        </div>
        
        <div className='pt-[20px] text-[16px] md:text-[]'>
           
        </div>
        <div className='text-center pt-[60px] bg-white'>
        <h1 className='md:text-[50px] text-[30px] font-bold'> Our Partners</h1>
        <Marquee>
          <div className='flex flex-row  md:gap-10 gap-5 mt-[50px]  md:pb-[50px] justify-center'>
            <img className='md:w-[150px] md:h-[100px] w-[100px] h-[70px]' src={partner}/>
            <h3 className='md:text-[40px] text-[20px] md:mt-[25px] mt-[20px] font-bold'>LBO GLOBAL SERVICES</h3>
          </div>
          </Marquee> 
        </div>
    </div>
  )
}

export default Partners