import slogon from './assets/Logo2.png'
import { Menu, X, LogIn ,User , ShoppingCart} from "lucide-react";
import React, { useState, useContext, useEffect } from "react"; 
import { Link } from 'react-router-dom'
import { ShopContext } from './cartContext'
import { supabase } from './Authenticcation/supabaseClient';



const Nav =() => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { getTotalCartItemCount } = useContext(ShopContext);
  const totalItems = getTotalCartItemCount();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsLoggedIn(!!session);
    };
  
    checkUser();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
    });
  
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);
  

    return (
      <div className="p-1 sticky bg-transparent justify-between flex shadow-md md:px-[130px]">
      <img src={slogon} className='w-[60px] max-md:hidden md:-ml-[120px] h-[80px]' />
      <ul className="flex gap-5 lg:gap-10 text-center  max-md:hidden md:text-[14px] lg:text-[16px] pt-[30px]">
        <Link to ='/' ><li className='hover:text-gray-400 text-black hover:border-b cursor-pointer'>
           Home
        </li></Link>
        <Link to = '/products'><li className='hover:text-gray-400 hover:border-b text-black cursor-pointer'>
          Products
        </li></Link>
        <Link to='/about'><li className='hover:text-gray-400 text-black hover:border-b h-[30px] cursor-pointer'>
          About us
        </li></Link>
       <Link to='/contact_us'><li className='hover:text-gray-400 text-black hover:border-b h-[30px] cursor-pointer'>
          Order Now
        </li></Link>
        <Link to='/partner'><li className='hover:text-gray-400 text-black hover:border-b h-[30px] cursor-pointer'>
          Partner with us
        </li></Link>
        <Link to='/career'><li className='hover:text-gray-400 text-black hover:border-b h-[30px] cursor-pointer'>
          Careers/Learning
        </li></Link>
      </ul>
        <div className='md:hidden container flex flex-row justify-between '>
        <img src={slogon} className='w-[50px] sm:ml-[30px] h-[60px]'/>
        <div className='flex gap-5'>
        <Link to='/CartPage' className='text-black flex'><ShoppingCart size={28} className='hover:shadow-xl mt-[18px] cursor pointer hover:bg-gray-300 hover:rounded-sm '/>{totalItems > 0 && (
        <span className="bg-red-500 text-white text-xs px-2 ml-[5px] py-1 h-[25px] mt-[18px] rounded-full">
          {totalItems}
        </span>
      )}</Link>
      <button className="md:hidden  text-black  " onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28}  /> : <Menu size={28} />}
        </button>
        </div>
        </div>
        {isOpen && (
        <div className="md:hidden bg-white w-[30rem] py-6">
          <ul className="flex flex-col  items-center gap-4 text-black">
            
          <Link to="/"><li className="font-bold hover:text-gray-400 border-b text-black cursor-pointer">
             Home
            </li></Link>
            <Link to='/products'><li className="font-bold hover:text-gray-400 border-b text-black cursor-pointer">
              Products
            </li></Link>
            <Link to="/about" ><li className="font-bold hover:text-gray-400 text-black border-b cursor-pointer">
               About us
            </li></Link>
            <li className="font-bold hover:text-gray-400 text-black border-b cursor-pointer">
            <Link to="/contact_us">Order Now</Link>
            </li>
            <li className="font-bold hover:text-gray-400 text-black border-b cursor-pointer">
            <Link to="/partner">Partner with us</Link>
            </li>
            <li className="font-bold hover:text-gray-400 text-black border-b cursor-pointer">
            <Link to="/career">Careers/Learning</Link>
            </li>
            <li className="font-bold hover:text-gray-400 text-black border-b cursor-pointer">
            {isLoggedIn ? (
               <Link to="/signout">SiginOut</Link>
             ) : (
              <Link to="/login">LogIn</Link>
             )}
            </li>
          </ul>
        </div>
      )}
      <div className='flex flex-row gap-8 pt-[30px] md:-mr-[70px] max-md:hidden'>
      {isLoggedIn ? (
         <Link to='/signout'>
           <User className='hover:shadow-xl cursor-pointer hover:bg-gray-300 hover:rounded-sm' />
         </Link>
      ) : (
        <Link to='/login'>
          <LogIn className='hover:shadow-xl cursor-pointer hover:bg-gray-300 hover:rounded-sm' />
        </Link>
      )}
      <Link to='/CartPage' className='text-black flex'><ShoppingCart className='hover:shadow-xl cursor pointer hover:bg-gray-300 hover:rounded-sm '/>{totalItems > 0 && (
        <span className="bg-red-500 text-white text-xs px-2 ml-[5px] py-1 h-[25px] rounded-full">
          {totalItems}
        </span>
      )}</Link>
      </div>
    </div>
    )
  }
  
  export default Nav