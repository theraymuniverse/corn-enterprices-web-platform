import React, {useState} from 'react'
import Nav from './Nav'
import img11 from './assets/career.jpg'
import Footer from './footer'
import {supabase} from './Authenticcation/supabaseClient' 

const Career = () => {
  const [formData, setFormData] = useState({
      name: "",
      career: "",
      message: "",
      role: "",
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
        const {name, career, message, role} = formData;
        const {data, error } = await supabase.from('careers').insert([{name, career, message, role}])
        if (error) {
          setMessage(`Error: ${error.message}`);
          console.log(error)
        } else {
          alert("Form submitted successfully")
          setMessage("Form submitted successfully!");
          setFormData({ name: "", career: "",message: "" , role: ""});
        }
        setLoading(false)
      };
    

  return (
    <div>
     <Nav/>
     <div className='md:p-15 items-center flex md:flex-row flex-col md:gap-20 lg:gap-35 xl:gap-50 md:p-20 lg:p-25 xl:p-30 '>
       <div>
        <h1 className='justify-center text-center md:text-start pt-[70px] md:pt-[30px] lg:text-[40px] xl:text-[50px] text-[31px] md:text-[30px]'>
           Start your Career in one leap<br/> <span className='text-green-500'>with COR'N </span>
        </h1>
        <p className='pt-5 text-[13px] md:text-[15px] text-center md:text-start px-[20px] md:px-[0px] '>Want to be a part of the great work we do at COR'N?<br/>
        Fill the the form below or contact us via whatsapp and we will get back to you as soon as possible.
        </p>
        </div>
        <img className=' w-[350px] md:w-[380px] lg:w-[450px] pt-[20px] xl:w-[550px] rounded-xl ' loading='lazy' src={img11}
        />
     </div>
     <div>
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
        <label className='text-[15px] md:text-[15px] lg:text-[15px] xl:text-[20px]'>Message</label><br/>
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