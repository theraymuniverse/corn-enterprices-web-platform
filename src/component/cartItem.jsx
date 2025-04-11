import React, {useContext} from 'react'
import { ShopContext } from '../cartContext';

const cartItem = (props) => {
    const {id, name, imageUrl , price } = props.data;
    const {cartItems, addToCart, removeFromCart, updateCartItemCount} = useContext(ShopContext)

    return (
    <div className='flex flex-row md:gap-3 gap-1  rounded-xl border  w-[400px] md:w-[700px]'>
       <img src={imageUrl} className='w-[150px] md:w-[230px] md:h-[200px]  rounded-2xl p-2'/>
       <div className='lg:pt-[30px]'>
        <p className='text-[25px]'>{name}</p>
        <p className='text-[20px]'>Price: ₦{price}</p>
        <div className='flex flex-row  text-[15px] md:text-[25px] pt-[15px] mb-[25px] md:mt-[10px]'>
        <button onClick={() => removeFromCart(id)} className=' w-8'>
            -
        </button>
        <input value={cartItems[id]} onChange={(e) => updateCartItemCount(Number(e.tartget.value), id)} className='justify-center text-center'>
            
        </input>
        
        <button onClick={() => addToCart(id)}>
            +
        </button>
        </div>
       </div>
    </div>
  )
}

export default cartItem