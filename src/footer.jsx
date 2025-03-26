import React from 'react'
import { useState } from "react";
import Logo from './assets/logo.jpg'
import frame1 from './assets/Frame 11.png'
import frame2 from './assets/Frame 12.png'
import frame3 from './assets/Frame 14.png'
import frame5 from './assets/frame 5.png'

const footer = () => {
  return (
    <div className='bg-white px-[30px]  md:px-40 rounded-lg shadow-2xl py-13'>
        <div className='flex border-b h-[300px] lg:h-[220px] mb-[10px] flex-col lg:flex-row gap-6'>
          <div className='items-center border-[1px] border-[white]  '>
            <h4 className='pt-[30px] text-[20px] md:text-[30px] font-bold '>SUBSCRIBE TO GET THE LATEST NEWS ABOUT US</h4>
            <p className='pt-2'>We recommend you to subscribe to our newspaper.</p>
            <p className='pt-2'>Enter your email to get daily updates about us</p>
         </div>
         <form name="submit-to-database" className='w-full max-w-[500px] border border-green-500 rounded-lg m-auto p-[5px]  flex items-center gap-8 bg-white '>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
            
              className='w-full py-3 md:text-[20px]'
            />
            <button className='py-[10px] px-[30px] hover:bg-green-900 transition cursor-pointer duration-700 border-0 bg-green-500 rounded-lg gap-2'>Subscribe</button>
          </form>
      </div>
      <div className='justify-between flex flex-col md:flex-row'>
        <img src={Logo} className='w-[156px] items-center self-center md:-ml-[30px]'/>
        <p className='text-center md:mt-[60px] md:text-[15px] lg:mt-[90px] lg:ml-[120px]'>
            Copyright @ COR'N Enterprises
           </p>
        <span className="flex gap-5 md:-mr-[40px]  pt-5 justify-center items-center">
             <a href="#">
               <img src={frame1} alt="Instagram" />
             </a>
             <a href="#">
                <img src={frame2} alt="Raym Universe" />
              </a>
              <a href="#">
                <img src={frame3} alt="Twitter" />
              </a>
              <a href="#">
                <img src={frame5}  className= 'w-13' alt="Gmail" />
              </a>
           </span>
           </div>
           <p className='text-center text-[10px] mt-[10px] md:mt-[1px]'>Made by Raym Universe</p>
    </div>
  )
}

export default footer