import React, {useState, useEffect} from 'react'
import Nav from './Nav'
import img11 from './assets/career.jpg'
import Footer from './footer'
import {supabase} from './Authenticcation/supabaseClient'
import {motion} from 'framer-motion'
import {ArrowUpRight,  GraduationCap} from 'lucide-react'   
import rice from './assets/Rice.jpg'

const Career = () => {
  const [role, setRole] = useState("");
  const [formData, setFormData] = useState({
      name: "",
      career: "",
      message: "",
      role: "",
      email: "",
      phone: "",
      type: ""
    });
    const [loading, setLoading] = useState(false);
      const [message,setMessage] = useState(null);
      const [errors, setErrors] = useState({});
    
      const handleChange = (e) => {
        setFormData(prev => ({
          ...prev,[e.target.name]: e.target.value
        }));
      };

      const handleRoleChange = (e) => {
      const selected = e.target.value;
      setFormData(prev => ({ ...prev, role: selected }));
      setRole(selected);
    };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);
        const {name, career, message, role, email, phone,type} = formData;

        try {
        const {data, error } = await supabase.from('careers').insert([{name, career, message, role, type}])
        if (error) throw error;

        const response = await fetch('https://www.cornenterprise.com/api/send-career', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({name, career, message, role, phone, email, type}),
        });

        const result = await response.json();
        if (response.ok) {
          alert(result.message || 'Thank you for subscribing!');
          setFormData({  name: "", career: "",message: "" , role: "", phone: "", email: "", type: "" });
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
         className=' justify-center text-center md:text-start font-bold pt-[70px] md:pt-[30px] lg:text-[40px] xl:text-[50px] text-[35px] md:text-[30px]'>
           Start your Career<br className='md:hidden'/> in one leap<br/> <span className='text-green-500'>with COR'N </span>
        </motion.h1>
         <p className='pt-5 text-[13px] md:text-[15px] text-center md:text-start px-[40px] md:px-[0px] '>At COR’N ENTERPRISES, we don’t just cultivate grains—we cultivate people. Our fields grow food, but our enterprise grows futures. Whether you're a fresh graduate, a seasoned professional, or a curious learner eager to break into agribusiness, there’s a place for you here.<br/>
        We are building a community of bold thinkers, skilled hands, and passionate professionals who believe that agriculture is not just about the land—but about the people who work it, manage it, and transform it.
        </p>
        </div>
        <img className=' w-[350px] md:w-[300px] lg:w-[450px] pt-[20px] xl:w-[550px] rounded-xl ' loading='lazy' src={img11}
        />
     </div>
     <div>
          <div className='p-18'>
        <h1 className='text-center text-[28px] font-semibold md:text-[20px] lg:text-[25px] xl:text-[33px]'>
          Learning <span className='text-green-500'> and </span> Capacity Building Programs
        </h1>
        <p className='text-center text-[15px] md:text-[15px] lg:text-[15px] xl:text-[20px] mt-5'>
          We offer a range of career and learning programs tailored for:
          </p>
        <div className=''>
        <ul className='items-center justify-center gap-10  mt-[40px] grid grid-cols-1 md:grid-cols-2 '>
          <li className='p-5 shadow-sm shadow-gray-300 rounded-lg '>
            <div className='flex justify-center gap-3'>
            <h1 className='text-center text-[27px]  '>
              Young Professionals
            </h1>
            <ArrowUpRight color='green' size={40} />
            </div>
            <p className='text-center mt-[30px]'>
                Entry-Level Placement<br/>
                Technical & Management Training<br/>
                Business of Agriculture Workshops<br/>
            </p>
          </li>
           <li className='p-5 shadow-sm  shadow-gray-300 rounded-lg overflow-hidden '>
             <div className='flex justify-center gap-3'>
            <h1 className='text-center text-[27px] '>
              Students & Graduates
            </h1>
             <ArrowUpRight color='green' size={40} />
            </div>
            <p className='text-center mt-[30px]'>
              Industrial Training (IT/SIWES)<br/>
              Graduate Internship Program<br/>
              Agro-Leadership Bootcamps
            </p>
          </li>
          <li className='p-5 shadow-sm shadow-gray-300 rounded-lg overflow-hidden '>
             <div className='flex justify-center gap-3'>
            <h1 className='text-center text-[27px]'>
              Community Empowerment
            </h1>
             <ArrowUpRight color='green' size={40} />
              </div>
            <p className='text-center mt-[30px]'>
                Rural Youth Empowerment Initiatives<br/>
                Women in Agriculture Programs
            </p>
          
          </li>
           <li className='p-5 shadow-sm shadow-gray-300 rounded-lg overflow-hidden '>
             <div className='flex justify-center gap-3'>
             <h1 className='text-center text-[25px] '>
              Farmers & Entrepreneurs
            </h1>
            <ArrowUpRight color='green' size={40} />
             </div>
            <p className='text-center mt-[30px]'>
              Agribusiness Masterclasses<br/>
              Financial Literacy for Farmers<br/>
              Digital Tools for Agricultural Growth
            </p>
          </li>
        </ul>
        </div>
     </div>
      <div>
     <div  className="grid grid-cols-1 xl:grid-cols-2 justify-center items-center gap-10  p-5 xl:p-20">
        <article className='items-center  lg:w-[950px] xl:w-[600px] justify-center  shadow-gray-300 rounded-lg p-5 md:p-0 '>   
              <h1 className='text-center text-[28px] font-semibold md:text-[30px] lg:text-[25px] xl:text-[33px] p-10'>
                Why Work <span className='text-green-500'>or</span>  Learn With COR'N?
             </h1>
             <p className='text-[13px] md:text-[15px] md:p-5 items-center justify-center '>  
             <span className='text-[20px] font-semibold'> 1. Purpose-Driven Work<br/></span>
            Join a team that is solving real problems—food insecurity, youth unemployment, and rural underdevelopment—through sustainable agricultural solutions.<br/>
             <span className='text-[20px] font-semibold'>2. Skill Development & Mentorship<br/></span>
            We invest in people. Whether it’s agronomy, processing, logistics, agribusiness management, or agro-financial services, you’ll gain practical, future-proof skills to thrive in the evolving food economy.<br/>
            <span className='text-[20px] font-semibold'> 3. Inclusive Culture<br/></span>
            We believe in equal opportunity, team spirit, and leadership at every level. Your voice matters, your ideas count, and your growth is our priority.<br/>
            <span className='text-[20px] font-semibold'>4. Learn by Doing<br/></span>
            From farm operations to agribusiness consulting, COR'N offers real-world experience. Our interns and trainees work on live projects—not just theoretical assignments.<br/>
            <span className='text-[20px] font-semibold'>  5. Career Pathways<br/></span>
            Start as an intern, grow into a trainee, and move into leadership. At COR'N, we’re not just offering jobs—we're building careers.<br/>
            </p>
        </article>

        <article className='items-center lg:w-[950px] xl:w-[600px]  justify-center shadow-gray-300 rounded-lg p-5'>
          <h1 className='text-center text-[28px]  font-semibold md:text-[30px] lg:text-[25px] xl:text-[33px] p-10'>
         Why Work <span className='text-green-500'>or</span>  Learn With COR'N?
           </h1> 
           <p className='md:text-center '>
              <span className='font-semibold text-[20px]'>🌍 Come Learn Where the Future is Growing<br/></span>
              Agriculture is changing—and we’re leading that change. At COR’N ENTERPRISES, you’re not just learning how to work. You’re learning how to make a difference.<br/>
              👉 Whether you want to work, train, volunteer, or partner in developing talent—COR’N is your gateway to meaningful impact.<br/>
               <span className='pt-[10px]'>Send your CV to careers@cornenterprise.com or check back regularly for job openings.<br/></span>
           </p> 
        </article>
      </div>
     </div>
       <div className='flex flex-col lg:flex-row items-center justify-center gap-10 p-20'>
       <div className=''>
        <img src={rice} loading='lazy' className='rounded-xl w-[400px]  xl:h-[800px] md:w-[600px] md:h-[500px] ' />
       </div>
       <div className='items-center '>
       <h1 className='text-[22px] ml-[20px] md:text-[30px] lg:text-[25px] xl:text-[30px] '>
         EXPLORE ENDLESS <span className='text-green-500'>POSSIBILITIES</span>
       </h1>
       <form onSubmit={handleSubmit} method="POST" className='p-5'>
        <div>
        <label className='text-[15px] md:text-[15px] lg:text-[15px] xl:text-[20px]'>Full Name</label><br/>
        <input className='border-2 border-gray-300 rounded-md p-2 w-[300px] md:w-[600px] lg:w-[500px] xl:w-[600px] mb-5' 
        type='text' 
        name='name'
        placeholder='Enter your name'
        value={formData.name}
        onChange={handleChange}
        required/><br/>
        </div>
        <div>
        <label className='text-[15px] md:text-[15px] lg:text-[15px] xl:text-[20px]'>Email</label><br/>
        <input className='border-2 border-gray-300 rounded-md p-2 w-[300px] md:w-[600px] lg:w-[500px] xl:w-[600px] mb-5'
         type='email'
         name='email' 
         value={formData.email}
         onChange={handleChange}
         placeholder='Enter your email' 
         required/><br/>
        </div>
        <div>
        <label className='text-[15px] md:text-[15px] lg:text-[15px] xl:text-[20px]'>Phone Number</label><br/>
        <input className='border-2 border-gray-300 rounded-md p-2 w-[300px] md:w-[600px] lg:w-[500px] xl:w-[600px] mb-5'
         type='tel'
         name='phone' 
         value={formData.phone}
         onChange={handleChange}
         placeholder='Enter your phone number' 
         required/><br/>
        </div>
        <div>
        <label className='text-[15px] md:text-[15px] lg:text-[15px] xl:text-[20px]'>Career Path</label><br/>
        <input className='border-2 border-gray-300 rounded-md p-2 w-[300px] md:w-[600px] lg:w-[500px] xl:w-[600px] mb-5'
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
          onChange={handleRoleChange}
          className='border-2 border-gray-300 rounded-md p-2 w-[300px] md:w-[600px] lg:w-[500px] xl:w-[600px] mb-5'>
          <option value=''>Choose your option</option>
          <option value='learn'>Learning Course</option>
          <option value='career'>Career</option>
          </select>
        </div>
        {role === "career" && (
                 <div className="mt-1">
                   <label  className=" md:ml-[5px] md:ml-[0px] pb-[10px]  text-[15px] md:text-[15px] lg:text-[15px] xl:text-[20px]">We are always on the lookout for:</label>
                    <select 
                     name="type"
                     value={formData.type}
                     onChange={handleChange}
                     className= " md:ml-[10px] border-2 border-gray-300 rounded-md p-2 w-[300px] mb-5" >
                  <option value="">Available Roles & Openings</option>
                  <option value="Farm Assistants & Field Officers">Farm Assistants & Field Officers</option>
                  <option value="Processing Plant Operators">Processing Plant Operators</option>
                  <option value="Agro-Marketing Executives">Agro-Marketing Executives</option>
                  <option value="Warehouse & Supply Chain Staff">Warehouse & Supply Chain Staff</option>
                  <option value="Administrative & Finance Interns">Administrative & Finance Interns</option>
                  <option value="Project & Training Coordinators">Project & Training Coordinators</option>
                </select>
                  </div>
                  )}
        <div>
        <label className='text-[15px] md:text-[15px] lg:text-[15px] xl:text-[20px]'>Why you wish to join us?</label><br/>
        <input className='border-2 border-gray-300 rounded-md p-2 w-[300px] md:w-[600px] lg:w-[500px] xl:w-[600px] mb-5'
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
     </div>
     <Footer/>
    </div>
  )
}

export default Career