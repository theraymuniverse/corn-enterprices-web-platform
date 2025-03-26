import React from 'react'
import fifth from './assets/farm.jpg'

const Investors = () => {
  return (
     <div className='mt-[30px] py-[100px] justify-center items-center lg:px-[200px] md:p-[5px]'>
            <div className='flex md:flex-row flex-col gap-30 lg:gap-30'>
            <img className= ' w-[50px] h-[500px] mb-[20px] rounded-2xl shadow-2xl ' src={fifth} />
            <span className='md:w-[500px] px-[30px] w-[300px]'>
            <h1 className='text-[40px] md:text-[50px] font-bold ' >
                Or Rather<br/> be an Investor
            </h1>
            <p className='md:text-[20px] mt-[20px]'>
                  Being an investor gives you greater insight to the company. 
                </p>
                <button className='border hover:bg-green-900 duration-500 hover:text-white border-green-500 rounded-md cursor-pointer text-center justify-center space-y-[20px] text-green-500 mt-[20px] px-[30px] py-[15px]'>
                Join Now</button>
             </span>
          </div>
     </div>
  )
}

export default Investors