import { useState } from "react";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.message) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      alert("Form submitted successfully!");
      setFormData({ name: "", email: "",subject: "", message: "" });
      setErrors({});
    }
  };

  return (
    <div className="lg:flex max-sm:w-[300px] ">
      <div className="p-10 border-green-300 md:pr-[120px] md:pl-[120px] text-[black]  rounded-lg  border  ">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[#0d0d0d] text-[24px]">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="p-2 h-[40px]  border-green-500 w-full md:w-[600px] border rounded-lg"
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
            className="w-[150px] transition duration-700 hover:bg-green-900 bg-green-500 text-black py-2 rounded-lg hover:bg-[] transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
