import { useState } from "react";
import Nav from './Nav'
import {supabase} from './Authenticcation/supabaseClient' 
import Footer from "./footer"
import icon2 from './assets/az.jpg'
import { motion } from "framer-motion"; 
import { Flag, Eye } from 'lucide-react';
import rose from './assets/open.jpg'
import store from './assets/store.jpg'
import truck from './assets/trucker.jpg'
import { MapPin } from 'lucide-react';

 const  PartnerPage = () => {
  const [role, setRole] = useState("");
  const [formData, setFormData] = useState({
    firstname: "",
    surname: "",
    email: "",
    phone: "",
    businessName: "",
    website: "",
    message: "",
    role: "",
    product: "",
  });
   const [loading, setLoading] = useState(false);
    const [message,setMessage] = useState(null);
    const [errors, setErrors] = useState({});

    const handleRoleChange = (e) => {
      const selected = e.target.value;
      setFormData(prev => ({ ...prev, role: selected }));
      setRole(selected);
    };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,[e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null)
    const {firstname, email, message,phone, surname, businessName, website, role, product} = formData;

    try {
     const {data, error } = await supabase.from('Partner_Investor').insert([{firstname, email, message,phone, surname, businessName, website, role, product}])
     if (error) throw error;
      
     const response = await fetch('https://www.cornenterprise.com/api/send-partner', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({firstname, email, message,phone, surname, businessName, website, role, product}),
    });

    const result = await response.json();
    if (response.ok) {
      alert(result.message || 'Thank you for subscribing!');
      setFormData({  firstname: "", surname: "", email: "", phone: "", businessName: "", website: "", message: "", role: "", product: ""});
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
    <div className="">
       <Nav/>
       
      <div className="flex gap-[40px] flex-col pb-[50px] justify-center items-center lg:items-center">
             <div className="justify-center items-center mt-[20px] md:p-[30px] p-10">
               <h1 className="text-center font-bold  text-[35px] sm:text-[18px] md:text-[35px]">
                 Partner with <span className="text-green-500">COR'N ENTERPRISES</span>
               </h1>
               <p className="text-center text-[10px] max-w-[650px] md:max-w-full md:text-[13px] ">
                Let's Grow Wealth, Feed Nations, and Build the Future of Agriculture Together.</p>
                <div className="flex md:flex-row flex-col md:p-2 gap-8 mt-[30px] ">
                <p className="lg:mt-[160px] md:mt-[80px] max-w-[500px] text-[12px] md:text-[15px] md:w-[600px]">At COR'N ENTERPRISES, we are not just growing grains—we are growing a vision for food security, economic empowerment, and sustainable agricultural wealth across Nigeria and beyond. From our base in Jalingo, Taraba State—Nature’s gift to the nation, we cultivate, process, distribute, and innovate across the grain value chain.
                As a dynamic agribusiness with strong roots and bold ambitions, we are calling on forward-thinking investors and strategic partners to join us in shaping the future of Africa’s grain economy.
               </p>
               <img src={icon2} loading="lazy" className="lg:w-120 lg:h-120 md:w-100 w-80  "/>
               </div>
             </div>
             <div>
              <h1 className="text-center px-[50px] font-bold text-[22px] md:text-[30px]"> 
                 Why Partner with COR’N ENTERPRISES?
              </h1>
              <ul
               className="grid md:p-20 p-15 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 md:mt-[20px]">
              <motion.li 
                 whileHover={{ scale: 1.2 }}
                 whileTap={{ scale: 0.2}}
              className="container shadow-sm shadow-gray-300   rounded-xl">
                <div className="mt-6 p-5 " >
                  <h1 className="text-green-500 mb-[10px] font-semibold text-center">Strategic Location in Taraba State</h1>
                  <p className="md:text-[15px]  text-center">
                    With fertile lands, favorable climate, and vast farming potential, Taraba provides the natural advantage to grow at scale
                  </p>
                </div>
                 </motion.li>
               <li className="container shadow-gray-300 shadow-sm rounded-xl">
                <div className="mt-6 p-5 " >
                  <h1 className="text-green-500 mb-[10px] font-semibold text-center"> Fast-Rising Agro Brand</h1>
                  <p className="text-[15px] text-center">
                    We’re building a strong brand presence, backed by trusted partners like LBO Global Services, and expanding across local and international markets.
                  </p>
                </div>
                 </li>
              <li className="container shadow-gray-300 shadow-sm rounded-xl">
                <div className="mt-6 p-5 " >
                  <h1 className="text-green-500 mb-[10px] font-semibold text-center">Diverse Partnership Avenues</h1>
                  <p className="text-[12px] text-center">
                      We welcome:<br/>
                      - Equity Investors<br/>
                      - Off-Takers & Bulk Buyers<br/>
                      - Export & Logistics Partners<br/>
                      - Franchisees & Distributors<br/>
                      - Agro-Financial Collaborators
                  </p>
                </div>
                 </li>
                <li className="container shadow-gray-300 shadow-sm rounded-xl">
                <div className="mt-6 p-5 " >
                  <h1 className="text-green-500 mb-[10px] font-semibold text-center">Impact-Driven and Scalable</h1>
                  <p className="text-[15px] text-center">
                    Beyond profits, we are committed to creating jobs, empowering farmers, and promoting food security across Africa
                  </p>
                </div>
                 </li>
              </ul>
             </div>
             <div className="md:p-10 gap-5 max-sm:w-[340px]  flex flex-row basis-50 md:gap-20  justify-center items-center">
               <div className="shadow-md  overflow-hidden rounded-lg h-[275px] md:h-[250px]">
               <Eye size={40} className="text-green-500 mx-auto mt-5" />
              <h1 className="text-center font-bold md:text-[30px] text-[20px] mt-[10px]"> 
                 Our Vision
              </h1>
              <p className="text-center md:text-[15px] text-[12px] p-5 max-w-[500px]">
                
To become the most excellent grain producing, processing, and distribution company, while pioneering agro-financial services in the grain industry.

              </p>
              </div>
              <div className="shadow-md  overflow-hidden rounded-lg h-[277px] md:h-[250px]">
                 <Flag size={40} className="text-green-500 mx-auto mt-5" />
                 <h1 className="text-center font-bold md:text-[30px] text-[20px] mt-[10px]"> 
                 Our Mission
              </h1>
              <p className="text-center md:text-[15px] text-[12px] p-5 max-w-[450px]">
               To deliver premium grains and inclusive agro-based financial services to the Nigerian people and the world at large.
              </p>
              </div>
             </div>
             <div className="justify-center items-center p-10">
             <section className="md:max-w-[600px] text-left justify-center items-center">
                <h1 className="font-semibold  text-[26px] md:text-[40px] text-center">What We Do?</h1>
                <p className="text-[13px] md:text-[16px] text-center px-[30px] ">
                  At COR'N ENTERPRISES, we operate a fully integrated model that spans:<br/>
                </p>
                <div class="grid md:grid-flow-col p-7 md:p-2 max-sm:grid-cols-1 justify-center md:grid-rows-3 gap-3 md:gap-5 lg:gap-9 mt-[20px]">
                  <div
                   className="bg-cover row-span-3 text-center pt-3 h-[250px]  w-[295px] md:h-[620px] md:w-[350px] lg:h-[650px]  lg:w-[750px] rounded-xl"
                   style={{ backgroundImage: `url(${rose})` }}
                    >                 
                    <h1 className="lg:mt-[250px] md:mt-[250px] mt-[100px] md:text-[40px]  lg:text-[50px] text-[35px] text-white font-semibold">Direct Farming</h1>
                  </div>
                  <div 
                   style={{ backgroundImage: `url(${truck})` }}
                   className="col-span-2  bg-cover rounded-xl   text-center h-[250px]  md:w-[400px]">
                  <h1 className="md:mt-[80px] mt-[60px] text-white md:text-[20px] text-[25px] font-semibold " >Distribution<br/> (local and global)</h1>
                  </div>
                  <div 
                   style={{ backgroundImage: `url(${store})` }}
                  className="col-span-2  bd-cover rounded-lg row-span-2 text-center  h-[250px] md:h-[350px]">
                  <h1 className="md:mt-[180px] mt-[90px] text-white text-[30px] font-semibold">
                   Storage and Processing
                  </h1>
                  </div>
                  
                </div>
                <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-1 md:gap-5 lg:gap-20 ">
                  <div className="lg:mt-[80px] px-[60px] w-[350px] md:px-[0px] md:-ml-[60px]  text-left ">
                 <h1 className="text-[50px] font-semibold mb-[20px]">
                    Join <span className="text-green-500">us</span>
                  </h1>          
                  <p>
                  Whether you’re an investor seeking strong returns, a partner seeking sustainable supply, or an organization looking to create real agricultural impact, COR’N ENTERPRISES is your ideal ally.<br/></p>  
                  <div className="text-[20px]">
                  <span className="text-green-500">Let’s turn fertile land into financial abundance.<br/> </span>
                  <span className="text-green-500 mb-[5px]">Let’s make grains not just grow—but thrive.<br/></span>
                  <span className="text-green-500 mb-[5px]">Let’s do it—together.</span>    
               </div>
                </div>
                <div className="mt-[80px] px-[20px] md:px-[40px] p-5 w-[330px]">
                      <div className="flex flex-row justify-center items-center gap-2 ">
                           <MapPin size={100} className=" " color="green"/>   <span className="text-[15px]">Head Office: Jalingo, Taraba State, Nigeria<br/>
                           Call Us:+234 813 190 8385<br/>
                           Email: admin@cornenterprise.com<br/>
                       </span>
                      </div>
                  </div>
                </div>
             </section>
          </div>
          <h2 className="text-[30px] font-bold text-center px-[40px] sm:px-[0px] text-center items-center md:text-[30px] lg:text-[40px]  pt-[40px]">Become a Partner or <span className="text-green-500">Investor</span></h2>
          <p className="text-center -mt-[25px] px-[20px]"> Ready to invest or collaborate?<br/>
Kindly fill the contact form beside to get started. A member of our executive team will reach out to you.</p>
          <div className="justify-center items-center">
          <form onSubmit={handleSubmit} method="POST" className="space-y-8 w-auto">
             <div className="flex md:flex-row flex-col  ">
            <label className="text-[20px] ml-[10px] lg:ml-[0px]  mt-[10px] ">Firstname:</label>
            <input
              type="text"
              name="firstname"
              placeholder="Enter your first name"
              value={formData.firstname}
              onChange={handleChange}
              required
              className="mt-[10px] w-[325px] md:w-[250px] lg:w-[400px] h-[35px] pl-[5px] ml-[10px] lg:ml-[10px] border-2 border-gray-300 rounded-sm block text-[#0d0d0d] text-[18px]"
              
            />
              <label className="text-[20px] mt-[10px] ml-[10px] lg:ml-[50px]">Surname:</label>
            <input
              type="text"
              name="surname"
              placeholder="Enter your surname"
              value={formData.surname}
              onChange={handleChange}
              required
              className="mt-[10px] w-[325px] md:w-[250px] border ml-[10px] lg:ml-[5px] h-[35px] pl-[5px] lg:w-[400px] border-gray-300 border-2 rounded-md block text-[#0d0d0d] text-[18px]"
              
            />
            </div>
            <div className="flex  flex-col">
            <label className="text-[20px]  mt-[10px]  ml-[10px] lg:ml-[0px] ">Enter Email:</label>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="block ml-[10px] w-[325px] md:w-[750px]  lg:ml-[0px]  text-[#0d0d0d] h-[35px] pl-[5px] mt-[10px]  border lg:w-[1050px] border-gray-300 border-2 rounded-md"
            />
              <label className="text-[20px] mt-[10px] ml-[10px] lg:ml-[0px] ">Phone Number:</label>
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
              className="block ml-[10px]  lg:ml-[0px] w-[325px] text-[#0d0d0d] mt-[10px] border ml-[5px] h-[35px] pl-[5px] md:w-[750px]  lg:w-[1050px] border-gray-300 border-2 rounded-md block text-[#0d0d0d] text-[18px]"
            />
              </div>
              <div className="flex flex-col md:flex-row">
              <div className="flex flex-col">
              <label className="text-[20px] ml-[10px] lg:ml-[0px]   mt-[10px]">Business/Company Name:</label>
            <input
              type="text"
              name="businessName"
              placeholder="Business Name"
              value={formData.businessName}
              onChange={handleChange}
              required
              className="block mt-[10px] border w-[325px] ml-[10px] lg:ml-[5px]  h-[35px] pl-[5px] lg:w-[600px] border-gray-300 border-2 rounded-md block text-[#0d0d0d] text-[18px] "
            />
            </div>
            <div className="flex  flex-col">
            <label  className="lg:ml-[160px] md:ml-[100px]  ml-[10px] mt-[20px] mb:mt-[4px] lg:mt-[0px]  pb-[10px] text-[20px]">Partner or Investor:</label>
                <select 
                name="role"
                value={formData.role}
                onChange={handleRoleChange}
                className= "border lg:ml-[150px] md:ml-[100px] ml-[10px] border-gray-300 border-2 w-[300px] text-[18px]" >
                  <option value="">Select Role</option>
                  <option value="Buyer">Buyer</option>
                  <option value="Seller">Seller</option>
                  <option value="investor">Investor</option>
                </select>
                </div>
            </div>
            {role === "Buyer" && (
                 <div className="mt-4">
                   <label  className=" ml-[5px] md:ml-[0px] pb-[10px] text-[20px]">Number of Bags, Kg or Tonnes</label>
                   <input
                         type="text"
                         name="product"
                         placeholder="Product needed"
                         value={formData.product}
                         onChange={handleChange}
                         required
                         className="block mt-[10px] border w-[325px] ml-[10px] lg:ml-[5px]  h-[35px] pl-[5px] lg:w-[900px] border-green-500 rounded-md block text-[#0d0d0d] text-[18px] "
                       />
                  </div>
                  )}
                  {role === "Seller" && (
                 <div className="mt-4">
                   <label  className=" ml-[5px] md:ml-[0px] pb-[10px] text-[20px]">Number of Bags, Kg or Tonnes</label>
                   <input
                         type="text"
                         name="product"
                         placeholder="Product needed"
                         value={formData.product}
                         onChange={handleChange}
                         required
                         className="block mt-[10px] border w-[325px] ml-[10px] lg:ml-[5px]  h-[35px] pl-[5px] lg:w-[900px] border-green-500 rounded-md block text-[#0d0d0d] text-[18px] "
                       />
                  </div>
                  )}
            <label className="text-[20px] ml-[10px] lg:ml-[0px] mt-[10px]">Bussiness Website</label>
            <input
              type="url"
              name="website"
              placeholder="Business Website (Optional)"
              value={formData.website}
              onChange={handleChange}
              className="block w-[325px] ml-[10px] lg:ml-[0px] text-[#0d0d0d] mt-[10px] border  h-[35px] pl-[5px] md:w-[750px]   lg:w-[1050px] border-gray-300 border-2 rounded-md block text-[#0d0d0d] text-[18px]"
            />

            <label className="text-[20px] ml-[10px] lg:ml-[0px] mt-[10px]">Tell us about your business.</label>
            <input
              name="message"
              placeholder="Why you want to partner or Invest?"
              value={formData.message}
              onChange={handleChange}
              required
              className="block md:ml-[10px] ml-[10px] lg:ml[0px]  text-[#0d0d0d] lg:ml-[0px] pb-[150px] mt-[10px] border h-[250px] pl-[5px] lg:w-[1050px] w-[330px] md:w-[780px] border-2 border-gray-300 rounded-md block text-[#0d0d0d] text-[18px]"
            />
            <div className="items-center justify-center text-center ">
            <button disabled={loading} type="submit" className="px-[25px] py-[13px] rounded-lg mt-[30px] items-center  border bg-black text-white">
              {loading ?  "Submitting.." : 'Submit Application'}
            </button>
            </div>
          </form>
     </div>
     </div>
     <Footer/>
    </div>
  );
}

export default PartnerPage;