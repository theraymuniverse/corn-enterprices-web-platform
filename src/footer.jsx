import React from 'react'
import { useState } from "react";
import Logo from './assets/logo.jpg'
import frame1 from './assets/Frame 11.png'
import frame2 from './assets/Frame 12.png'
import frame3 from './assets/Frame 14.png'
import frame4 from './assets/Frame 5302.png'

const footer = () => {
  return (
    <div className='bg-white px-[30px]   md:px-40 rounded-lg shadow-2xl py-13'>
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
            <button className='py-[10px] px-[30px] border-0 bg-green-500 rounded-lg gap-2'>Subscribe</button>
          </form>
      </div>
      <div className='justify-between flex flex-col md:flex-row'>
        <img src={Logo} className='w-[156px] ml-[80px] md:-ml-[30px]'/>
        <p className='text-center md:mt-[60px] md:text-[15px] lg:mt-[90px]'>
            Copyright @ COR'N Enterprises
           </p>
        <span className="flex gap-5 md:-mr-[40px]  pt-5 justify-center items-center">
             <a href="https://www.instagram.com/raym.unlimited/">
               <img src={frame1} alt="Instagram" />
             </a>
             <a href="https://www.theraymuniverse.com/">
                <img src={frame2} alt="Raym Universe" />
              </a>
              <a href="https://twitter.com/RaymUnlimited">
                <img src={frame3} alt="Twitter" />
              </a>
              <a href="https://discord.gg/vUPaUkckFw">
                <img src={frame4} alt="Discord" />
              </a>
           </span>
           </div>
    </div>
  )
}

export default footer