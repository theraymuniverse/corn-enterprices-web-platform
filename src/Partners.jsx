import React from 'react'
import fourth from './assets/pp.jpg'
import partner from './assets/partner.png'
import Marquee from "react-fast-marquee";

const Partners = () => {
  return (
    <div className='mt-[30px] py-[100px] justify-center items-center lg:px-[200px] md:p-[5px]'>
        <div className='flex md:flex-row flex-col gap-30 lg:gap-50'>
        <span className='md:w-[500px] px-[30px] w-[300px]'>
        <h1 className='text-[40px] md:text-[50px] font-bold ' >
            Partner with <br/> COR'N Enterprises.
        </h1>
        <p className='md:text-[20px] mt-[20px]'>
                Join forces with our company truxted ny over 1000+ customers.
                Become an accredited partner to our services today. 
            </p>
            <button className='border border-green-500 rounded-md cursor-pointer text-center justify-center space-y-[20px] text-green-500 mt-[20px] px-[30px] py-[15px]'>Learn More</button>
         </span>
        <img className= 'w-[450px] h-[550px] rounded-2xl shadow-2xl ' src={fourth} />
        </div>
        
        <div className='pt-[20px] text-[16px] md:text-[]'>
           
        </div>
        <div className='text-center pt-[60px]'>
        <h1 className='md:text-[50px] text-[30px] font-bold'> Our Partners</h1>
        <Marquee>
          <div className='flex flex-row  md:gap-10 gap-5 mt-[50px] justify-center'>
            <img className='md:w-[150px] md:h-[100px] w-[100px] h-[70px]' src={partner}/>
            <h3 className='md:text-[40px] text-[20px] md:mt-[25px] mt-[20px] font-bold'>LBO GLOBAL SERVICES</h3>
          </div>
          </Marquee> 
        </div>
    </div>
  )
}

export default Partners