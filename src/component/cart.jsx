import React, {useContext } from 'react'
import { ShopContext } from '../cartContext'
import { ShoppingCart } from 'lucide-react';

const cart = ({item}) => {
    const {id, name, imageUrl , price } = item
    const { addToCart, cartItems } = useContext(ShopContext)
    const cartItemAmount = cartItems[id]

  return (
    <div className='group flex hover:shadow-2xl hover:shadow-green-300 flex-col w-[300px] h-[360px] md:h-[350px] md:w-[330px] lg:w-[400px] lg:h-[400px] gap-y-2 border  border-gray-100 duration-800 ease-out rounded-xl p-4 md:p-13 '>
        <img src={imageUrl} 
        alt="Products Image" 
        width={1500} 
        height={500}
        className='group-hover:-translate-y-2 md:mt-[20px] rounded-xl
        transition-all duratioin-500 h-[200px]  w-[300px] md:w-[700px]' loading='lazy'/>
        <div className=' justify-center text-center '>
           <h1 className='text-black '>{name}</h1>
           <span className='text-red-300 text-lg'>Price: ₦{price}</span>
           <button onClick={() => addToCart(id)} className='flex border text-[18px] justify-self-center bg-green-500 text-white border-green-300 text-green-300 rounded-lg mt-[10px] hover:bg-green-900 hover:text-white duration-500 transition p-[5px] px-[35px]'>
             <ShoppingCart className=' w-10 -ml-[30px]' />
             Buy Now {cartItemAmount > 0 && <> ({cartItemAmount}) </>}
           </button>
        </div>      
    </div>
  )
}

export default cart