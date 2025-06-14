import React, {useState, useEffect} from 'react'
import Nav from './Nav'
import img11 from './assets/career.jpg'
import Footer from './footer'
import {supabase} from './Authenticcation/supabaseClient'
import {motion} from 'framer-motion'

const Career = () => {
  const [formData, setFormData] = useState({
      name: "",
      career: "",
      message: "",
      role: "",
      email: "",
      phone: "",
    });
    const [loading, setLoading] = useState(false);
      const [message,setMessage] = useState(null);
      const [errors, setErrors] = useState({});
    
      const handleChange = (e) => {
        setFormData(prev => ({
          ...prev,[e.target.name]: e.target.value
        }));
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);
        const {name, career, message, role, email, phone} = formData;

        try {
        const {data, error } = await supabase.from('careers').insert([{name, career, message, role}])
        if (error) throw error;

        const response = await fetch('https://www.cornenterprise.com/api/send-career', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({name, career, message, role, phone, email}),
        });

        const result = await response.json();
        if (response.ok) {
          alert(result.message || 'Thank you for subscribing!');
          setFormData({  name: "", career: "",message: "" , role: "", phone: "", email: "" });
        } else {
          alert(result.message || 'Error sending email, please try again.');
        }
      } catch (err) {
        console.error('Error:', err);
        alert('Something went wrong. Please try again.');
      }
        setLoading(false)
      };
    
  return (
    <div>
     <Nav/>
     <div className='md:p-15 items-center flex md:flex-row flex-col md:gap-20 lg:gap-35 xl:gap-40 md:p-20 lg:p-20 xl:p-30 '>
       <div>
        <motion.h1
         style={{overflow: 'hidden', whiteSpace: 'nowrap'}}
         initial={{width: 0}}
         animate={{width: '100%'}}
         transition={{duration: 2, ease: 'easeInOut'}}
         className=' justify-center text-center md:text-start pt-[70px] md:pt-[30px] lg:text-[40px] xl:text-[50px] text-[31px] md:text-[30px]'>
           Start your Career in one leap<br/> <span className='text-green-500'>with COR'N </span>
        </motion.h1>
         <p className='pt-5 text-[13px] md:text-[15px] text-center md:text-start px-[20px] md:px-[0px] '>At COR’N ENTERPRISES, we don’t just cultivate grains—we cultivate people. Our fields grow food, but our enterprise grows futures. Whether you're a fresh graduate, a seasoned professional, or a curious learner eager to break into agribusiness, there’s a place for you here.<br/>
        We are building a community of bold thinkers, skilled hands, and passionate professionals who believe that agriculture is not just about the land—but about the people who work it, manage it, and transform it.
        </p>
        </div>
        <img className=' w-[350px] md:w-[380px] lg:w-[450px] pt-[20px] xl:w-[550px] rounded-xl ' loading='lazy' src={img11}
        />
     </div>
     <div>
     {/*<div className='p-20'>
        <h1 className='text-center text-[25px] md:text-[20px] lg:text-[25px] xl:text-[33px]'>
          Learning <span className='text-green-500'> and </span> Capacity Building Programs
        </h1>
        <ul className='items-center justify-center mt-[40px] flex flex-row gap-10'>
          <li className='p-5 shadow-sm rounded-lg overflow-hidden w-[600px] '>
            <h1 className='text-center '>
              Students & Graduates
            </h1>
          </li>
           <li className='p-5 shadow-sm rounded-lg overflow-hidden w-[600px] '>
            <h1 className='text-center text-[20px] '>
              Students & Graduates
            </h1>
            <p className='text-center mt-[30px]'>
              Industrial Training (IT/SIWES)<br/>
              Graduate Internship Program<br/>
              Agro-Leadership Bootcamps
            </p>
          </li>
        </ul>
         <ul className='items-center justify-center mt-[40px] flex flex-row gap-10'>
          <li className='border w-[600px] '>
            <h1 className='text-center '>
              Students & Graduates
            </h1>
          </li>
           <li className='border w-[600px] '>
            <h1 className='text-center '>
              Students & Graduates
            </h1>
          </li>
        </ul>
        
     </div>*/}
       <h1 className='text-center p-3 text-[25px] md:text-[25px] lg:text-[30px] xl:text-[40px] mb-[30px] pt-10'>
         EXPLORE ENDLESS <span className='text-green-500'>POSSIBILITIES</span>
       </h1>
       <div className='items-center pl-[20px]'>
       <form onSubmit={handleSubmit} method="POST" className='lg:p-20 p-5'>
        <div>
        <label className='text-[15px] md:text-[15px] lg:text-[15px] xl:text-[20px]'>Full Name</label><br/>
        <input className='border-2 border-gray-300 rounded-md p-2 w-[90%] md:w-[80%] lg:w-[70%] xl:w-[50%] mb-5' 
        type='text' 
        name='name'
        placeholder='Enter your name'
        value={formData.name}
        onChange={handleChange}
        required/><br/>
        </div>
        <div>
        <label className='text-[15px] md:text-[15px] lg:text-[15px] xl:text-[20px]'>Email</label><br/>
        <input className='border-2 border-gray-300 rounded-md p-2 w-[90%] md:w-[80%] lg:w-[70%] xl:w-[50%] mb-5'
         type='email'
         name='email' 
         value={formData.email}
         onChange={handleChange}
         placeholder='Enter your email' 
         required/><br/>
        </div>
        <div>
        <label className='text-[15px] md:text-[15px] lg:text-[15px] xl:text-[20px]'>Phone Number</label><br/>
        <input className='border-2 border-gray-300 rounded-md p-2 w-[90%] md:w-[80%] lg:w-[70%] xl:w-[50%] mb-5'
         type='tel'
         name='phone' 
         value={formData.phone}
         onChange={handleChange}
         placeholder='Enter your phone number' 
         required/><br/>
        </div>
        <div>
        <label className='text-[15px] md:text-[15px] lg:text-[15px] xl:text-[20px]'>Career Path</label><br/>
        <input className='border-2 border-gray-300 rounded-md p-2 w-[90%] md:w-[80%] lg:w-[70%] xl:w-[50%] mb-5'
         type='text'
         name='career' 
         value={formData.career}
         onChange={handleChange}
         placeholder='Enter your career path' 
         required/><br/>
        </div>
        <div>
        <label className='text-[15px] md:text-[15px] lg:text-[15px] xl:text-[20px]'>What brings you here?</label><br/>
          <select
          name='role' 
          value={formData.role}
          onChange={handleChange}
          className='border-2 border-gray-300 rounded-md p-2 w-[90%] md:w-[80%] lg:w-[70%] xl:w-[50%] mb-5'>
          <option value=''>Choose your option</option>
          <option value='learn'>Learning Course</option>
          <option value='career'>Career</option>
          </select>
        </div>
        <div>
        <label className='text-[15px] md:text-[15px] lg:text-[15px] xl:text-[20px]'>Why you wish to join us?</label><br/>
        <input className='border-2 border-gray-300 rounded-md p-2 w-[90%] md:w-[80%] lg:w-[70%] xl:w-[50%] mb-5'
         type='text' 
         name='message'
         value={formData.message} 
         onChange={handleChange}
         required
         placeholder='What makes you tick?' /><br/>
        </div>
        <button
            type="submit"
            disabled={loading}
            className="w-[150px] transition duration-700 hover:bg-green-900 bg-green-500 text-black py-2 rounded-lg hover:bg-[] transition"
          >
           {loading ?  "Submitting.." : 'Submit'}
          </button>
       </form>
       </div>
     </div>
     <Footer/>
    </div>
  )
}

export default Career