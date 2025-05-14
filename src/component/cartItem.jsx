import React, {useContext, useState} from 'react'
import { ShopContext } from '../cartContext';


const cartItem = (props) => {
    const [formData, setFormData] = useState({
        role: "",
    });
    const { id, name, imageUrl, price } = props.data;
    const { cartItems, addToCart, removeFromCart, updateCartItemCount } = useContext(ShopContext);

    const handleRoleChange = (e) => {
        const selected = e.target.value;
        setFormData((prev) => ({ ...prev, role: selected }));
        props.setRoleInCart(id, selected); // Pass the role to the parent
    };


    return (
    <div className='flex flex-row md:gap-3 gap-1 items-center rounded-xl border  w-[350px] md:w-[700px]'>
       <img src={imageUrl} className='w-[150px] md:w-[230px] md:h-[200px]  rounded-2xl p-2'/>
       <div className='lg:pt-[10px]'>
        <p className='text-[20px] pt-[5px] md:pt-[0px] text-center md:text-[25px]'>{name}</p>
        <div className='flex flex-col md:flex-row justify-center items-center gap-2 lg:gap-3 mt-3'>
        <label  className="text-[18px] text-center">Kg, Ton or Bags:</label>
                <select 
                name="role"
                value={formData.role}
                onChange={handleRoleChange}
                className= "border border-gray-500 w-[150px] md:w-[200px]   h-[25px] text-[15px]" >
                  <option value="">Select category</option>
                  <option value="Kg">Kg</option>
                  <option value="Bags">Bags</option>
                  <option value="Tons">Tons</option>
                </select>
        </div>
        <div className='flex flex-row  text-[15px] text-[20px] md:text-[25px] pt-[15px] mb-[25px] md:mt-[10px]'>
        <button onClick={() => removeFromCart(id)} className=' w-8'>
            -
        </button>
        <input value={cartItems[id]} onChange={(e) => updateCartItemCount(Number(e.target.value), id)} className='justify-center w-[100px] md:w-[300px] text-center'>
            
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