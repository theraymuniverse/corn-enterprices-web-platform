import React from 'react'
import Nav from './Nav'
import Logo from './assets/Logo2.png'
import light from './assets/Light.jpg'
import Footer from './footer'
import biz from './assets/Biz.jpg'
import core from './assets/Core.jpg'

const About = () => {
  return (
    <div>
     <Nav/>
     <div className='items-center '>
     <div className='flex md:flex-row flex-col  gap-2 pt-[20px] items-center pb-[100px] lg:ml-[60px] xl:ml-[120px] md:ml-[50px] '>
        <div className='md:pt-[100px] lg:pt-[150px] '>
        
        <h1 className='font-bold justify-center pt-[30px] lg:text-[40px]  md:text-[30px] pb-[10px] lg:pl-[40px] md:pl-[30px] text-center max-sm:text-center text-[25px]'>
            About US
        </h1>
        <p className='lg:px-[50px] md:px-[20px] text-[12px] px-[40px]  md:w-[500px] md:text-[14px] lg:text-[16px] xl:text-[17px] lg:mb-[80px] xl:mb-[100px] lg:w-[700px] xl:w-[900px] h-[50px] text-center'>
        COR'N Enterprises is one of the leading producers of high quality agricultural produce. With our aim at mainly grains such as maize,millet, either raw or powered form. We prioritize the need of our customers and ensure that we deliver the best quality products. COR'N Sources these products for Large, Medium and Small scale businesses.
        </p>
        </div>
        <div className='md:mt-[30px] mt-[30px] pt-[40px] md:pt-[0px] lg:mt-[0px]'>
        <img src={Logo} alt='form' loading='lazy' className='xl:w-[300px] w-[150px] lg:w-[250px] md:w-[150px] lg:mt-[50px] md:mt-[60px]  p-[30px] '/>
        </div>
     </div>
     <div className='pt-[80px] bg-[#F3FFF1]  text-[18px] pb-[50px] flex flex-col items-center md:flex-row md:gap-10 gap-5 '>
     <img src={light} alt='form' loading='lazy' className='xl:w-[400px] w-[150px] ml-[15px] lg:w-[250px] md:w-[150px] lg:ml-[110px] xl:ml-[150px] md:ml-[50px] rounded-full'/>
     <div className=' lg:ml-[20px] items-center'>
      <h2 className='xl:ml-[130px] lg:ml-[90px] text-center  lg:text-[40px] md:text-[30px] md:ml-[10px] lg:pt-[20px]   pb-[10px] text-[25px] font-bold'>
        Our Vision
      </h2>
      <p className='xl:w-[500px] text-center w-[200px] text-[12px] lg:w-[450px] md:w-[400px]  text-center md:text-[14px] lg:text-[17px] lg:ml-[70px] xl:ml-[140px]  '>
      To become the most excellent grain producing, 
      processing and distribution company inculcating 
      agro-financial services in the grain industry.</p>
      </div>
     </div>
     <div className='flex md:flex-row flex-col gap-2 md:pt-[30px] pb-[100px] lg:ml-[120px] '>
        <div className='pt-[150px] '>
        
        <h1 className='font-bold justify-center text-center text-[25px] lg:text-[40px] md:text-[30px] pb-[10px] md:pl-[30px] lg:pl-[120px] xl:pl-[30px]'>
            Our Mission
        </h1>
        <p className='px-[50px] lg:w-[450px] xl:w-[700px] text-[14px] md:w-[500px]   h-[50px] md:text-[14px] lg:text-[17px]  text-center'>
        To deliver quality grains and agro-based financial services to Nigerian people and the world at large🌍
        </p>
        </div>
        <img src={biz} alt='form' loading='lazy' className='xl:w-[450px] w-[350px]  place-self-center xl:ml-[40px]  lg:w-[350px]  md:w-[250px] lg:mt-[50px] md:mt-[80px] p-[30px] rounded-xl'/>
     </div>
     <div className='md:pt-[70px] z-20 pt-[10px] bg-[#F3FFF1] text-[18px] pb-[100px] flex md:flex-row flex-col gap-10'>
     <img src={core} alt='form'  loading='lazy' className='xl:w-[400px]  lg:w-[300px] md:w-[250px] md:h-[250px]  md:ml-[30px] lg:ml-[150px] rounded-lg'/>
     <div className='xl:pt-[60px]  xl:ml-[20px]'>
      <h2 className='xl:ml-[20px] lg:ml-[30px] md:ml-[10px] pt-[10px] pb-[10px] lg:text-[40px] md:text-[30px] text-center text-[25px] font-bold'>
        Our Core Values
      </h2>
      <p className='xl:w-[500px] ml-[60px] lg:w-[500px] w-[250px] text-start xl:ml-[140px]  lg:ml-[20px] md:text-[14px] lg:text-[17px] text-[15px]'>
         <span className='text-green-500 font-bold text-[20px]'>Integrity:   </span>If we say it, we will do it.<br/>
         <span className='text-green-500 font-bold text-[20px]'>Excellence:   </span>We are never short of standard and expectations.<br/>
         <span className='text-green-500 font-bold text-[20px]'>Fruitfulness:   </span>Our products and services are always available 
         .<br/>
         <span className='text-green-500 font-bold text-[20px]'>Growth:   </span>
         You never meet us at the same plan twice.<br/>
     </p>
        </div>
     </div>
     </div>
     <Footer/>
    </div>
  )
}

export default About