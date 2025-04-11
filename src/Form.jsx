import { useState } from "react";
import { supabase } from "./Authenticcation/supabaseClient";


const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [message,setMessage] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,[e.target.name]: e.target.value
    }));
  };

  const validate = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    if (!formData.message.trim()) errors.message = 'Message cannot be empty';
    return errors;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    const validateErrors = validate();
    const {name, email, message} = formData;
    const {data, error } = await supabase.from('contacts').insert([{name, email, message}])
    if(Object.keys(validateErrors).length > 0){
      setErrors(validateErrors);
      return;
    }
    setErrors({})

    if (error) {
      setMessage(`Error: ${error.message}`);
      console.log(error)
    } else {
      alert("Form submitted successfully")
      setMessage("Form submitted successfully!");
      setFormData({ name: "", email: "",message: "" });
    }
    setLoading(false)
  };

  return (
    <div className="lg:flex max-sm:w-[300px] ">
      <div className="p-10 border-green-300 md:pr-[120px] md:pl-[130px] text-[black]  rounded-lg  border  ">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[#0d0d0d] text-[24px]">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="p-2  h-[40px]  border-green-500 w-full md:w-[400px] lg:w-[500px]  border rounded-lg"
              placeholder="Enter your name"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>
          <div>
            <label className="block text-[#0D0D0D] text-[24px]">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border h-[40px] border-[#003D56] border-green-500  mt-[10px] rounded-lg"
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          {/* Message Field */}
          <div>
            <label className="block text-[#0D0D0D] text-[24px] ">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-2 border border-[#003D56] mt-[10px]  border-green-500 rounded-lg"
              rows="4"
              placeholder="Write your message..."
            ></textarea>
            {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
          </div>

          {/* Submit Button */}
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
  );
};

export default Form;
