import React, {useState} from 'react'
import boss from './assets/Boss.jpg'

const Ceo = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  return (
    <div className='p-5  md:pb-[50px]'>
    <div className='text-center'>
        <h1 className='text-[45px] font-bold'>
            Our CEO
        </h1>
    </div>
    <div className='flex lg:flex-row md:flex-row justify-center items-center flex-col gap-9'>
    <div>
    <img src={boss} alt='Pic of CEO' className='xl:w-[550px]  w-[230px]  md:w-[400px] md:h-[400px] lg:h-[500px] m lg:pl-[150px]' loading='lazy'/>
       </div>
       <div className='flex flex-col '>
        <span className='lg:pt-[30px] md:pt-[30px] px-[15px] md:text-[13px] lg:text-[14px] text-[11px]  md:w-[400px] lg:w-[500px] xl:w-[650px] 2xl:w-[800px]'>
        <span className="font-bold text-[12px] md:text-[14px] lg:text-[15px]" > Mr. CHINEDU NWOBODO <span className="text-[10px] md:text-[11px]  ">ACA, DCP, MBA.</span> </span> <br/>
        Mr. Chinedu Nwobodo is the Founder and CEO of COR'N Enterprises. A graduate of the Enugu State University of Science and Technology with a B.Eng. in Chemical engineering. A professional banker and astute Entrepreneur with half a decade's experience in the financial industry. With over 4 years’ experience within the Agricultural value chain as a primary producer and grain trader, Mr. Chinedu leads a great team of experts as they work together to make COR'N Enterprises a household name in the industry within the shortest of time.
        Chinedu is an Associate Chartered Accountant with the Institute of Chartered Accountants of Nigeria, A designate Compliance Professional, A Chartered Management Professional and holds an MBA in Finance.
        </span>
        {isVisible && <span className='px-[15px]  md:text-[13px] lg:text-[14px] text-[11px] md:w-[400px] lg:w-[500px] xl:w-[650px] 2xl:w-[800px]'>Excellence as a lifestyle, and on this principle, COR'N exists.The company thrives on the ability of the CEO to transcend traditional ideas and patterns to create meaningful and profitable methods, to meet unarticulated and existing market needs. With a combination of professional approaches from a sound management team in solving problems, making informed decisions, and implementing good work processes. COR'N is projected as the future of sustainable Agriculture, through its entire value chain.
          Chinedu seeks to remain relevant in an ever-changing world of work by finessing his visions in the industry. COR'N group has worked with several partners and supplied more than 10trucks of well packaged grain all over nigeria and to corporations. He is enthusiastic, all grit and determination. Thrilled at the immense opportunities in Nigeria and Africa’s agri-business sector, he is determined to bring the agricultural culture to the nigerian landscalp again. </span>}

        <button onClick={toggleVisibility} className=' w-[130px] hover:bg-green-500 ml-[100px] mt-[30px] lg:ml-[60px] md:ml-[140px] md:mt-[30px] items-center justify-self-center rounded-md px-[2px] py-[10px] bg-green-300'>
         {isVisible ? 'Hide Text' : 'Read More'}
        </button>
         </div>
     </div>   
    </div>
  )
}

export default Ceo
