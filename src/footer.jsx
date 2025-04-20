import React from 'react'
import { useState } from "react";
import Logo from './assets/Logo2.png'
import frame1 from './assets/Frame 11.png'
import frame2 from './assets/Frame 12.png'
import frame3 from './assets/Frame 14.png'
import frame5 from './assets/frame 5.png'
import frame6 from './assets/frame 6.png'
import {supabase} from './Authenticcation/supabaseClient'

const footer = () => {
  const [formData, setFormData] = useState({
    email: "",
  }); 

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,[e.target.name]: e.target.value
    }));
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const {email} = formData;
    const {data, error } = await supabase.from('NewsLetter').insert([{email}])
    if (error) {
      console.log(error)
    } else {
      alert("Form submitted successfully")
      setFormData({ email: "" });
    }
  }
  return (
    <div className='bg-white px-[30px]  md:px-24 rounded-lg py-13'>
        <div className='flex border-b h-[300px] lg:h-[220px] mb-[10px] flex-col lg:flex-row gap-6'>
          <div className='items-center border-[1px] border-[white]  '>
            <h4 className='pt-[30px] text-[20px] md:text-[25px] font-bold '>SUBSCRIBE TO GET THE LATEST NEWS ABOUT US</h4>
            <p className='pt-2 md:text-[15px]'>We recommend you to subscribe to our newspaper.</p>
            <p className='pt-2 md:text-[15px]'>Enter your email to get daily updates about us</p>
         </div>
         <form onSubmit={handleSubmit} method="POST" className='w-full max-w-[500px] border border-green-500 rounded-lg m-auto p-[5px]  flex items-center gap-5 bg-white '>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className='w-full py-3 md:text-[20px]'
            />
            <button className='py-[10px] px-[30px] hover:bg-green-900 transition cursor-pointer duration-700 border-0 bg-green-500 rounded-lg gap-2'>Subscribe</button>
          </form>
      </div>
      <div className='justify-between flex flex-col md:flex-row'>
        <img src={Logo} loading='lazy' className='md:w-[60px] lg:w-[80px] w-[80px] items-center self-center md:-ml-[30px]'/>
        <p className='text-center md:mt-[45px] md:text-[13px] lg:mt-[60px] lg:ml-[120px]'>
            Copyright @ COR'N Enterprises
           </p>
        <span className="flex gap-5 md:-mr-[40px]  pt-5 justify-center items-center">
             <a href="https://wa.me/2348131906385">
               <img src={frame1} alt="Whatsapp" className='md:w-[35px] w-12 lg:w-[50px]'/>
             </a>
             <a href="https://www.facebook.com/profile.php?id=61574547677212">
                <img src={frame2} alt="Facebook" className='md:w-[35px] lg:w-[50px]' />
              </a>
              <a href="https://www.instagram.com/corne_nterprises?igsh=MWc3YWZyd3c3NG1kbQ==">
                <img src={frame3} alt="Instgram" className='md:w-[35px] lg:w-[50px]' />
              </a>
              <a href="https://www.youtube.com/@CornEnterprises">
                <img src={frame5}  className= 'lg:w-15 w-14 md:w-[40px]' alt="Youtube" />
              </a>
              <a href="https://x.com/EnterprisesCorn?t=Oeh5Vn28HSKbeQVuAZowQQ&s=09">
                <img src={frame6}  className= 'lg:w-13 w-12 md:w-[35px]' alt="x" />
              </a>
           </span>
           </div>
           <p className='text-center text-[10px] mt-[10px] md:mt-[10px]'>Made with ❤️ by Raym Universe</p>
    </div>
  )
}

export default footer