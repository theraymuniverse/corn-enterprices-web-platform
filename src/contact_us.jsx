import React from 'react'
import Form from './Form'
import {Mail, Phone} from 'lucide-react'

const contact_us = () => {
  return (
<div id="contact" className="lg:h-[700px] bg-[#F3FFF1] lg:flex-col  text-black pt-10 md:pt-20 md:pl-[50px] pb-[50px] lg:px-[60px] xl:px-[]">
      {/* Content Section */}
      <div className="flex flex-col lg:flex-row lg:gap-10 items-center justify-center  gap-8 px-4">
        {/* Left Section */}
        <div className="lg:w-1/2 text-center lg:text-center ">
          <p className="text-2xl lg:-mt-[120px] md:text-6xl md:text-[40px] lg:text-[50px] font-bold mb-6"
          >Contact Us 
          </p>
          <p className='md:text-[14px]'>Feel free to fill the form or send us a whatsapp message.<br/>
          You can also reach us through our email</p>
           <div className='flex flex-row md:-ml-[100px] ml-[50px] md:mt-[20px] mt-[20px] md:mb-[10px] mb-[20px] md:gap-5'>
           <Mail className='lg:ml-[180px] md:ml-[150px]  flex flex-row' size={40} />
           <p className='md:mt-[5px] md:text-[15px]'> cornenterprises2709@gmail.com</p>
           </div>
           <div className='flex flex-row md:-ml-[100px]  ml-[50px] md:pt-[20px] md:pb-[20px] pb-[20px] md:gap-5'>
           <Phone className='lg:ml-[180px] md:ml-[150px]  flex flex-row' size={40} />
           <p className='md:mt-[5px] md:text-[15px]'>+234 8023447314 </p>
           </div>
          <a
            href="https://wa.me/2348131906385"
            className="inline-block bg-green-400  text-black text-lg md:text-[17px] md:py-4 py-2 px-4 md:px-6 rounded-lg hover:bg-green-900 mt-[10px] transition duration-300"
          >
            SEND A WHATSAPP MESSAGE
          </a>
        </div>
        <Form/>  
      </div>
    </div>
  )
}

export default contact_us