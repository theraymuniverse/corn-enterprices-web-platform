import React from 'react'
import first from './assets/woman.jpg'
import second from './assets/Farmer.jpg'
import { Link } from 'react-router-dom'
import { ChevronsDown } from 'lucide-react';

const home = () => {
  return (
    <div className='bg-gradient-to-tr h-[500px] max-sm:h-[650px] md:h-[600px] from-green-00 to-[#1B7A43] relative '>
    <img src={second} className='absolute w-full h-[500px] max-sm:h-[650px] md:h-[600px] object-cover mix-blend-overlay' />
    <div className='p-8 pt-[120px]  md:text-center md:justify-center  text-white '>
    <span className='text-white text-[50px] md:text-[60px] lg:pt-[20px] font-bold'>
        Discover Modern Agriculture</span>
        <p className='text-[30px] font-bold'>and 
        Create a Greener Future</p>
        <p className='text-[20px] mt-[30px]'>
        Modern agriculture represents a paradigm shift in the way
        we approach food production.
        </p>
        <Link to = '/'><ChevronsDown className='max-sm:hidden  animate-bounce justify-self-center md:mt-[80px]  border rounded-full text-center' size={70} /></Link>
    </div>    
    </div>
  )
}

export default home