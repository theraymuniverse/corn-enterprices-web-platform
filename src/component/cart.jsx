import React from 'react'

const cart = ({item}) => {
    const {id, name, imageUrl , price } = item
  return (
    <div className='group flex relative hover:shadow-2xl hover:shadow-green-300 flex-col w-[300px] h-[360px] md:h-[350px] md:w-[330px] lg:w-[450px] lg:h-[360px] gap-y-2 border  border-gray-100 duration-800 ease-out rounded-xl p-4 md:p-13 lg:p-18'>
        <img src={imageUrl} 
        alt="Products Image" 
        width={1500} 
        height={500}
        className='group-hover:-translate-y-2 mt-[40px] md:mt-[20px] lg:mt-[5px] rounded-xl
        transition-all duratioin-500 h-[200px] w-[300px] md:w-[700px]' />
        <div className='absolute bottom-3 md:bottom-2 '>
           <h1 className='text-black'>Name: {name}</h1>
           <span className='text-green-400 text-sm'>Price: ₦{price}</span>

        </div>     
    </div>
  )
}

export default cart