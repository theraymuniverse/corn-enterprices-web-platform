import React, {useState} from 'react'
import {X} from "lucide-react" 
import cornfetti from '../assets/Some.jpg'
import {Link, useNavigate } from 'react-router-dom'


const Popup = ({onClose, whatsappUrl }) => {
    const navigate = useNavigate();

  return (
    <div className='fixed inset-0 bg-opacity-30 backdrop-blur-sm flex justify-center'>
    <div className='md:mt-50 mt-43 flex flex-col gap-5 text-black lg:w-[800px] md:w-[600px] w-[350px]'>
         <button onClick = {onClose}  className='place-self-end'>
           <X size={30}/> 
         </button>
         <div className='bg-white shadow-md rounded-xl md:py-10 md:px-20 px-15 py-10  mx-6 md:mx-4 justify-center items-center  gap-6    '>
            <div className='items-center justify-center flex flex-col'>
            <img className='w-[90px] h-[100px]' src={cornfetti}/>
            </div>
            <h1 className='text-center font-extrabold text-2xl md:text-3xl '>
                Thank you for your purchase
            </h1>
            <p className='mt-3 text-sm md:text-md text-center '>
                Our sales representative will reach out to you shortly to confirm your order and offer you a quotation.
            </p>
                      <a
                 href={whatsappUrl}
                 target="_blank"
                 rel="noopener noreferrer external"
                 className="bg-green-500 text-[10px] md:text-[15px] text-white rounded-xl p-3 block mt-4 text-center"
                 onClick={() =>  window.location.reload()}
               >
                 Open WhatsApp to complete your order
               </a>
            <div className='flex flex-row gap-4 justify-center mt-9'>
               <Link to='/'><button onClick={navigate('/')} className='bg-black text-white py-1 px-1 md:px-5 md:py-2 md:text-[15px] rounded-xl text-[10px] hover:bg-gray-500 pointer cursor  duration-300 ease-out'>Return to home page</button></Link>
               <Link to = '/products'><button onClick={navigate('/partner')} className='bg-black text-white py-1 px-1 md:px-5 md:py-2 md:text-[15px] rounded-xl text-[10px] hover:bg-gray-500 pointer cursor duration-300 ease-in-out '> Parnter With Cor'n</button></Link>            
           </div>
         </div>
    </div>
    </div>
  )
}

export default Popup