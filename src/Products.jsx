import React from 'react'
import maize from './assets/maize.jpg'
import powder1 from './assets/corn_flour.jpg'
import {Link} from 'react-router-dom'

const Products = () => {
    const handleClick = () => {
        window.scrollTo(0, 0);
    }

  return (
    <div className='text-center bg-[#F3FFF1] md:h-[2050px] lg:h-[850px]  pt-[40px]'>
        <h className='text-[35px] font-bold '>
            What we Offer.
        </h>
        <ul className='items-center flex lg:flex-row flex-col  mt-[20px] h-auto' >
            <li className='p-1 pt-[50px] lg:pl-[20px]  m-5'>
                <img loading='eager' alt='form'  className='shadow-md hover:shadow-2xl  rounded-lg w-[350px] rounded-xl h-[200px] md:h-[300px] md:w-[450px] lg:w-[350px] lg:h-[200px]' src={maize}/>
                <p className='pt-[30px] md:text-[20px] lg:text-[20px]'>Yellow Maize</p>
            </li>
            <li className='p-1 pt-[50px] m-5'>
                <img loading='lazy' alt='form' className=' shadow-2xl  rounded-lg w-[350px]  rounded-xl h-[200px] md:h-[300px] md:w-[450px] lg:w-[350px] lg:h-[200px]' src={maize}/>
                <p className='pt-[30px] md:text-[20px] lg:text-[20px]'>White Millet</p>
            </li>
            <li className='p-1 pt-[50px] m-5'>
                <img loading='lazy'  alt='form' className='shadow-2xl rounded-lg w-[350px]  rounded-xl h-[200px] md:h-[300px] md:w-[450px] lg:w-[350px] lg:h-[200px]' src={powder1}/>
                <p className='pt-[30px] md:text-[20px] lg:text-[20px]'>Corn Powder</p>
            </li>
            <li className='pt-[60px] hidden md:block lg:px-[30px] '>
                <h1 className = 'lg:text-[45px] text-[45px] md:text-[60px] ' >
                    Best Products  
                  </h1>
                <p className='items-start -ml-[20px] lg:text-[14px] md:text-[18px] md:pb-[40px] lg:pb-[40px] pb-[30px] '>Select from a variety of differnet grains.<br/>
                The best choice is COR'N enterprises</p>
                <Link onClick={handleClick} to= '/products' className='text-center justify-center mr-[10px] border bg-green-300 text-white border-white rounded-md lg:px-[25px] lg:py-[10px] md:px-[30px] md:py-[20px] px-[25px] py-[10px] hover:bg-green-800 hover:shadow-green-200 hover:shadow-xl mt-[30px]'>View all Products</Link>
            </li>
        </ul>
        <div className='mt-[60px] pb-[100px] sm:hidden'>
        <h1 className = 'text-[45px] ' >
                    Best Products  
                </h1>
                <p className='items-start -ml-[20px] md:text-[14px] pb-[30px] '>Select from a variety of differnet grains.<br/>
                The best choice is COR'N enterprises</p>
                <Link onClick={handleClick} to ='/products' className='text-center justify-center mr-[10px] border bg-green-300 text-white border-white rounded-md px-[25px] py-[10px] hover:bg-green-800 hover:shadow-green-200 hover:shadow-xl mt-[30px]'>View all Products</Link>

        </div>
        <ul className='flex md:flex-row flex-col mt-[20px] h-[300px] px-[50px] max-lg:hidden justify-end' >
            <li className='p-2 pt-[50px]   m-5'>
                <img loading='lazy' alt='form' className='shadow-md hover:shadow-2xl  rounded-lg w-[350px] rounded-xl h-[200px]' src={maize}/>
                <p className='pt-[20px] lg:text-[20px]'>Yellow Maize</p>
            </li>
            <li className='p-2 pt-[50px] m-5'>
                <img  loading='lazy' alt='form' className=' shadow-2xl  rounded-lg w-[350px] rounded-xl h-[200px]' src={maize}/>
                <p className='pt-[20px] lg:text-[20px]'>White Millet</p>
            </li>
            <li className='p-2 pt-[50px] m-5'>
                <img loading='lazy' alt='form' className='shadow-2xl rounded-lg w-[350px] rounded-xl h-[200px]' src={powder1}/>
                <p className='pt-[20px] lg:text-[20px]'>Corn Powder</p>
            </li>
        </ul>
    </div>
  )
}

export default Products