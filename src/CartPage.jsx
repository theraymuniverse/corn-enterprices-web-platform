import React, { useContext } from 'react'
import products from './data/data'
import { ShopContext } from './cartContext'
import CartItem from './component/cartItem'
import Nav from './Nav'
import { Link } from 'react-router-dom'
 

const CartPage = () => {
    const { cartItems } = useContext(ShopContext)

    const handleeClick  = () => {
      const cartDetails = products
    .filter((item) => cartItems[item.id] > 0)
    .map((item) => {
      return `${item.name} x ${cartItems[item.id]} = ₦${item.price * cartItems[item.id]}`;
    })
    .join('%0A'); // %0A = line break in URL

  const total = products.reduce((acc, item) => {
    return acc + item.price * cartItems[item.id];
  }, 0);

  const message = `Hello! I would like to order:%0A${cartDetails}%0A%0ATotal: ₦${total}`;

  // Replace with your WhatsApp number (with country code, no "+" or dashes)
  const phoneNumber = '237080136945';

  const url = `https://wa.me/${phoneNumber}?text=${message}`;

  window.open(url, '_blank');
};
    

  return (
    <div>
              <Nav/>
              <div className='p-10'>
          <div>
            <h1 className='text-center text-[50px] '> Items in Cart</h1>
          </div>
          <div className='pt-6 justify-self-center flex flex-col gap-6 '>
            {products.map((items) => {
                if (cartItems[items.id] !== 0){
                    return <CartItem data = {items} />;
                }
            })}
          </div>
          <div className='Justify-center text-center pt-[20px]  '>
             <p className='text-[20px] md:text-[30px]'>
                Subtotal: ₦{products.reduce((acc, item) => {
                    return acc + item.price * cartItems[item.id]
                }, 0)}
             </p>
             <div className='flex justify-center flex-row gap-6 pt-[40px]'>
             <button className='bg-black text-white rounded-xl p-3 hover:bg-gray-500 pointer cursor'><Link to='/products'>Countine Shopping</Link></button>
             <button onClick={handleeClick} className='bg-black text-white rounded-xl p-3 hover:bg-gray-500 poniter cursor'>Cash Out</button>
             </div>
             </div>
          </div>
    </div>
  )
}

export default CartPage