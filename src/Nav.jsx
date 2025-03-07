import {Search, UserRoundSearch} from 'lucide-react'
import slogon from './assets/Logo.jpg'
import { Menu, X,  } from "lucide-react";
import React, { useState } from "react"; 
import {Link } from 'react-router-dom'

const Nav =() => {
  const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="p-1 sticky bg-transparent justify-between flex shadow-md md:px-[130px]">
      <img src={slogon} className='w-[80px] max-md:hidden md:-ml-[80px] h-[80px]' />
      <ul className="flex gap-10 text-center  max-sm:hidden text-[20px] pt-[30px]">
        <Link to ='/' ><li className='hover:text-gray-400 text-black border-b cursor-pointer'>
           Home
        </li></Link>
        <Link to = '/products'><li className='hover:text-gray-400 border-b text-black cursor-pointer'>
          Products
        </li></Link>
        <li className='hover:text-gray-400 text-black border-b h-[30px] cursor-pointer'>
          About us
        </li>
       <li className='hover:text-gray-400 text-black border-b h-[30px] cursor-pointer'>
          Contact us 
        </li>
      </ul>
        <div className='md:hidden container flex flex-row justify-between '>
        <img src={slogon} className='w-[80px] md:-ml-[80px] h-[80px]' />
      <button className="md:hidden  text-black  " onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28}  /> : <Menu size={28} />}
        </button>
        </div>
        {isOpen && (
        <div className="md:hidden bg-white w-[50rem] py-5">
          <ul className="flex flex-col  items-center gap-4 text-black">
            
          <Link to="/"><li className="hover:text-gray-400 border-b text-black cursor-pointer">
             Home
            </li></Link>
            <Link to='/products'><li className="hover:text-gray-400 border-b text-black cursor-pointer">
              Products
            </li></Link>
            <Link to="" ><li className="hover:text-gray-400 text-black border-b cursor-pointer">
               About us
            </li></Link>
            <li className="hover:text-gray-400 text-black border-b cursor-pointer">
            <Link to="">Conatct Us</Link>
            </li>
          </ul>
        </div>
      )}
      <div className='flex flex-row gap-8 pt-[30px] md:-mr-[40px] max-sm:hidden'>
      <Search className=' w-[25px] h-[25px] rounded-xl md:block hidden'/>
      <UserRoundSearch className=''/>
      </div>
    </div>
    )
  }
  
  export default Nav