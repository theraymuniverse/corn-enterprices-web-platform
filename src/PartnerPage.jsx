import { useState } from "react";
import Nav from './Nav'
import {supabase} from './Authenticcation/supabaseClient' 



 const  PartnerPage = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    surname: "",
    email: "",
    phone: "",
    businessName: "",
    website: "",
    message: "",
    partner: "",
    investor: "",
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
    setMessage(null)
    const {firstname, email, message,phone, surname, businessName, website,partner,investor} = formData;
     const {data, error } = await supabase.from('Partner/Investor').insert([{firstname, email, message,phone, surname, businessName, website,partner,investor}])
     if (error) {
      setMessage(`Error: ${error.message}`);
      console.log(error)
    } else {
      alert("Form submitted successfully")
      setMessage("Form submitted successfully!");
      setFormData({ firstname: "", email: "",message: "",phone: "", surname: "", businessName: "", website: "",partner: " ",investor: ""  });
    }
    setLoading(false)
  };

  return (
    <div className="">
       <Nav/>
       
      <div className="flex gap-[40px] flex-col pb-[50px] justify-center items-center lg:items-center">
          <h2 className="text-xl font-bold text-center text-center items-center md:text-[30px] lg:text-[40px]  pt-[40px]">Become a Partner or Investor</h2>
          <div className="justify-center  items-center">
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
              className="mt-[10px] w-[350px] md:w-[250px] lg:w-[400px] h-[35px] pl-[5px] ml-[10px] lg:ml-[10px] border border-green-500 rounded-sm block text-[#0d0d0d] text-[18px]"
              
            />
              <label className="text-[20px] mt-[10px] ml-[10px] lg:ml-[50px]">Surname:</label>
            <input
              type="text"
              name="surname"
              placeholder="Enter your surname"
              value={formData.surname}
              onChange={handleChange}
              required
              className="mt-[10px] w-[350px] md:w-[250px] border ml-[10px] lg:ml-[5px] h-[35px] pl-[5px] lg:w-[400px] border-green-500 rounded-md block text-[#0d0d0d] text-[18px]"
              
            />
            </div>
            <div className="flex lg:flex-row flex-col">
            <label className="text-[20px]  mt-[10px]  ml-[10px] lg:ml-[0px] ">Enter Email:</label>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="block ml-[10px] w-[350px] md:w-[600px] ml-[10px] lg:ml-[5px] text-[#0d0d0d] h-[35px] pl-[5px] mt-[10px]  border lg:w-[350px] border-green-500 rounded-md"
            />
              <label className="text-[20px] mt-[10px] ml-[10px] lg::ml-[30px] ">Phone Number:</label>
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
              className="block ml-[10px] w-[350px] ml-[10px] lg:ml-[5px] text-[#0d0d0d] mt-[10px] border ml-[5px] h-[35px] pl-[5px] md:w-[600px] lg:w-[400px] border-green-500 rounded-md block text-[#0d0d0d] text-[18px]"
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
              className="block mt-[10px] border w-[350px] ml-[10px] lg:ml-[5px]  h-[35px] pl-[5px] lg:w-[600px] border-green-500 rounded-md block text-[#0d0d0d] text-[18px] "
            />
            </div>
            <div className="flex  flex-col">
            <label for="cars" className="lg:ml-[160px] md:ml-[100px]  ml-[10px] mt-[20px] mb:mt-[4px] lg:mt-[0px]  pb-[10px] text-[20px]">Partner or Investor:</label>
                <select className= "border lg:ml-[150px] md:ml-[100px] ml-[10px] border-green-500 w-[300px] text-[18px]" id="cars" name="part">
                  <option value={formData.partner}>Partner</option>
                  <option value={formData.investor}>Investor</option>
                </select>
                </div>
            </div>
            <label className="text-[20px] ml-[10px] lg:ml-[0px] mt-[10px]">Bussiness Website</label>
            <input
              type="url"
              name="website"
              placeholder="Business Website (Optional)"
              value={formData.website}
              onChange={handleChange}
              className="block w-[350px] ml-[10px] lg:ml-[0px] text-[#0d0d0d] mt-[10px] border  h-[35px] pl-[5px] md:w-[600px] border-green-500 rounded-md block text-[#0d0d0d] text-[18px]"
            />

            <label className="text-[20px] ml-[10px] lg:ml-[0px] mt-[10px]">Tell us about your business.</label>
            <input
              name="message"
              placeholder="Why you want to partner or Invest?"
              value={formData.message}
              onChange={handleChange}
              required
              className="block md:ml-[20px] ml-[10px] lg:ml[0px]  text-[#0d0d0d] lg:ml-[0px] pb-[150px] mt-[10px] border h-[250px] pl-[5px] lg:w-[1050px] w-[330px] md:w-[780px] border-green-500 rounded-md block text-[#0d0d0d] text-[18px]"
            />
            <div className="items-center justify-center text-center ">
            <button disabled={loading} type="submit" className="px-[25px] py-[13px] rounded-lg mt-[30px] items-center  border bg-black text-white">
              {loading ?  "Submitting.." : 'Submit Application'}
            </button>
            </div>
          </form>
     </div>
     </div>
    </div>
  );
}

export default PartnerPage;