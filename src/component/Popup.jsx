import React, {useState} from 'react'
import {X} from "lucide-react" 
import cornfetti from '../assets/Some.jpg'

const Popup = ({onClose}) => {
   

  return (
    <div className='fixed inset-0 bg-opacity-30 backdrop-blur-sm flex justify-center'>
    <div className='md:mt-50 mt-43 flex flex-col  gap-5 text-black lg:w-[800px] md:w-[600px] w-[350px]'>
         <button onClick = {onClose}  className='place-self-end'>
           <X size={30}/> 
         </button>
         <div className='bg-white shadow-md rounded-xl md:py-10 md:px-20 px-15 py-10  mx-6 md:mx-4 items-center  gap-6    '>
            <img className='w-[90px] place-self-center  h-[100px]' src={cornfetti}/>
            <h1 className='text-center font-extrabold text-2xl md:text-3xl '>
                Thank you for your purchase
            </h1>
            <p className='mt-3 text-sm md:text-md text-center '>
                Our sales representative will reach out to you shortly to confirm your order and offer you a quotation.
            </p>
         </div>
    </div>
    </div>
  )
}

export default Popup