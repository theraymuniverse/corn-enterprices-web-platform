import React, { useEffect, useState } from 'react';

const testimonials = [
  {
    name: "John Doe",
    text: "This service changed my life! Absolutely phenomenal.",
  },
  {
    name: "Jane Smith",
    text: "Great customer service and super fast delivery.",
  },
  {
    name: "Alex Johnson",
    text: "The best platform I've used for online shopping!",
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Change slide every 3 seconds (3000ms)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % testimonials.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="md:w-full px-5 md:px-[0px] md:p-15 bg-[#F3FFF1] md:mb-[100px] mt-[20px] lg:h-[460px] text-center ">
      <h2 className="text-[30px] md:text-[40px] font-bold pt-[30px] mb-6">What Our Customers Say</h2>
      <div className='lg:px-[300px] transition duration-500 ease-in-out'>
      <div className=" py-15 items-center   ">
        <p className="text-[18px] md:text-[25px] italic mb-4">"{testimonials[currentIndex].text}"</p>
        <h4 className="text-[20px] font-semibold text-gray-600">
          — {testimonials[currentIndex].name}
        </h4>
      </div>
      </div>
    </div>
  );
};

export default Testimonials