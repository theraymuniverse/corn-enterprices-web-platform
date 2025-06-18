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
     <div className='flex  md:flex-row flex-col  gap-2 items-center pb-[100px] lg:ml-[60px] xl:ml-[120px] md:ml-[50px] '>
        <div className='md:pt-[30px] lg:pt-[20px] items-center justify-center '>
        <h1 className='font-bold justify-center pt-[30px] lg:text-[40px]  md:text-[30px] pb-[10px] lg:pl-[40px] md:pl-[30px] text-center max-sm:text-center text-[25px]'>
            About US
        </h1>
        <p className='text-center text-[12px] md:text-[15px]'>We Grow Grains. We Build Systems. We Create Value.</p>
        <p className='lg:px-[50px] md:px-[20px] text-[12px] sm:text-[12px] px-[40px]  md:w-[500px] md:text-[14px] lg:text-[14px] lg:mb-[80px] xl:mb-[100px] lg:w-[700px] xl:w-[750px] 2xl:w-[950px] h-[50px] text-center'>
          <br/>Welcome to COR’N ENTERPRISES, a proudly Nigerian agribusiness rooted in the fertile lands of Jalingo, Taraba State—Nature’s gift to the nation. We are a rising force in Nigeria’s agricultural and agro-financial space, committed to delivering excellence in grain production, processing, distribution, and capacity building.
          <br/>Born out of the need to bridge the gap between food production and economic inclusion, COR'N ENTERPRISES is more than just a grain company—we are a solution-driven, impact-focused enterprise transforming how grains are grown, distributed, and monetized in Nigeria and beyond.

        </p>
        </div>
        <div className='md:pt-[30px] mt-[180px] pt-[40px] md:pt-[0px] lg:mt-[0px]'>
        <img src={Logo} alt='form' loading='lazy' className='xl:w-[300px] w-[150px] lg:w-[250px] md:w-[150px] lg:mt-[50px] md:mt-[60px]  p-[30px] '/>
        </div>
     </div>
     <div className='pt-[80px] bg-[#F3FFF1]  text-[18px] pb-[50px] flex flex-col items-center md:flex-row 2xl:pl-[50px] md:gap-10 gap-5 '>
     <img src={light} alt='form' loading='lazy' className='xl:w-[400px] w-[150px] ml-[15px] lg:w-[250px] md:w-[150px] lg:ml-[110px] xl:ml-[150px] md:ml-[50px] rounded-full'/>
     <div className=' lg:ml-[20px] xl:-ml-[40px] 2xl:ml-[0px] items-center'>
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
        <div className='pt-[150px] xl:-ml-[120px] 2xl:-ml-[0px] '>
        
        <h1 className='font-bold justify-center text-center text-[25px] lg:text-[40px] md:text-[30px] pb-[10px] md:pl-[30px] lg:pl-[120px] xl:pl-[30px]'>
            Our Mission
        </h1>
        <p className='px-[50px] lg:w-[450px] xl:w-[700px] text-[14px] md:w-[500px]   h-[50px] md:text-[14px] lg:text-[17px]  text-center'>
        To deliver quality grains and agro-based financial services to Nigerian people and the world at large🌍
        </p>
        </div>
        <img src={biz} alt='form' loading='lazy' className='xl:w-[450px] w-[350px]  place-self-center xl:ml-[40px]  lg:w-[350px]  md:w-[250px] lg:mt-[50px] md:mt-[80px] p-[30px] rounded-xl'/>
     </div>
     <div className='px-[60px] lg:px-[150px] mb-[50px] bg-[#F3FFF1] pt-[50px] pb-[50px]'>
        <h1 className=' font-bold text-[25px] lg:text-[40px] md:text-[30px] pb-[10px]]'>
          Who We <span className='text-green-500'>Are</span>
        </h1>
        <p className='text-[12px] md:text-[14px] '>We are a multi-service agro-enterprise focused on delivering quality grains—paddy rice, processed rice, maize, benne seed, groundnut, soya beans, and more—while integrating financial access, training, consulting, and innovation into our business model.
        <br/>Our work spans:<br/>
         <span className='font-bold'>1. Direct Farming<br/></span>
         <span  className='font-bold'>2. Processing & Value Addition<br/></span>
         <span  className='font-bold'>3. Storage & Logistics<br/></span>
         <span  className='font-bold'>4.Distribution (local and global)<br/></span>
         <span  className='font-bold'>5.Agribusiness Training & Advisory Services<br/></span>
        <span className='font-bold'>6.Agro-Financial Inclusion Solutions<br/></span>
        </p>
        <p className='mt-[10px] text-[12px] md:text-[14px] ' >Our team is driven by a shared belief that food security, financial inclusion, and rural prosperity are interconnected—and agriculture must be approached as both a business and a movement.<br/>
        </p>
     </div>
       <div className='grid grid-cols-1 p-10 md:grid-cols-2 gap-5 pt-[10px] pb-[50px] px-[60px]'>
         <div className=''>
           <h1 className='font-bold xl:px-[80px] text-[25px] lg:text-[35px] md:text-[25px] pb-[10px]'>
             Why We <span className='text-green-500'> Exist</span>
           </h1>
          <p className='xl:px-[80px] text-[12px] md:text-[14px] lg:text-[15px]'>
            Nigeria and Africa at large has the land, the people, and the demand to become a global agricultural powerhouse. What we often lack is organization, access, and strategy.<br/>
            At COR'N ENTERPRISES, we exist to change that narrative by:<br/>
            Making grains accessible and affordable<br/>
            Making farming more profitable and structured<br/>
            Making agro-investments more rewarding<br/>
            Making agriculture a national tool for prosperity<br/>
           </p>
        </div>
        <div className='mt-[40px] md:mt-0'>
          <h1 className='xl:px-[80px] font-bold text-[25px] lg:text-[35px] md:text-[25px] pb-[10px]  xl:pl-[70px]'>
            Where We're <span className='text-green-500'>Headed</span> 
          </h1>
          <p className='xl:px-[80px] text-[12px] md:text-[14px] lg:text-[15px]'>
            In the next 5 years, we aim to become Nigeria’s most trusted name in grain supply and agro-financial services—a household name for consumers, a trade partner for buyers, and a wealth builder for investors.
            <br/>We are already on that journey—with bold ideas, strategic partnerships (like LBO Global Services), and expanding footprints across local, national, and international markets.
          </p>
        </div>
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