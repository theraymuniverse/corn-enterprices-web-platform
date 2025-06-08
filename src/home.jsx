import React, {useState, useEffect} from 'react'
import second from './assets/oo.jpg'
import { Link } from 'react-router-dom'
import { ChevronsDown } from 'lucide-react';
import {motion} from 'framer-motion'
import { HashLink } from 'react-router-hash-link';
import third from './assets/yu.jpg'
import fourth from './assets/pl.jpg'
import five from './assets/po.jpg'

 const icon = [
   {
     img: fourth 
   },
    {
     img: second
   },{
    
    img: third
   },{
    img: five
   }
 ]


const home = () => {
   
    const [currentIndex, setCurrentIndex] = useState(0);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % icon.length)
      }, 5000);
  
      return () => clearInterval(interval);
    }, []);

  return (
    <div
     className='h-[500px]  max-sm:h-[650px] md:h-[600px]  relative '>
    <img
    alt='home'
    src={icon[currentIndex].img} className='absolute w-full h-[500px] max-sm:h-[650px] md:h-[600px] object-cover mix-blend-overlay' />
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
  
        <HashLink>
        <div  className="hidden md:block" >
        <ChevronsDown className='
         animate-bounce  md:mt-[80px] border  rounded-full ' size={70} />
        </div>
        </HashLink>    
    </motion.div>    
    </div>
  )
}

export default home