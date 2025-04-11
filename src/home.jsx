import React from 'react'
import second from './assets/Farmer.jpg'
import { Link } from 'react-router-dom'
import { ChevronsDown } from 'lucide-react';
import {motion} from 'framer-motion'
import { HashLink } from 'react-router-hash-link';


const home = () => {
  return (
    <div
     className='bg-gradient-to-tr h-[500px]  max-sm:h-[650px] md:h-[600px] from-green-00 to-[#1B7A43] relative '>
    <img
    alt='home'
    src={second} className='absolute w-full h-[500px] max-sm:h-[650px] md:h-[600px] object-cover mix-blend-overlay' />
    <motion.div 
     initial={{ y:30, opacity: 0, }}
     whileInView= {{ y:0, opacity: 1}}
     transition={{duration: 2}}
    className='p-8 pt-[120px]  md:text-center  md:justify-items-center text-white '>
    <span
     className='text-white text-[50px] md:text-[60px] lg:pt-[20px] font-bold'>
        Discover Modern Agriculture</span>
        <p className='text-[30px] font-bold'>and 
        Create a Greener Future</p>
        <p className='text-[20px] mt-[30px]'>
        Modern agriculture represents a paradigm shift in the way
        we approach food production.
        </p>
  
        <HashLink><ChevronsDown className='max-sm:hidden 
         animate-bounce  md:mt-[80px] border  rounded-full ' size={70} /></HashLink>    
    </motion.div>    
    </div>
  )
}

export default home