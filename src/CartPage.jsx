import React, { useContext, useState, useEffect } from 'react'
import products from './data/data'
import { ShopContext } from './cartContext'
import CartItem from './component/cartItem'
import Nav from './Nav'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { supabase } from './Authenticcation/supabaseClient'

const CartPage = () => {
    const { cartItems } = useContext(ShopContext)
    const navigate = useNavigate();
     
    const [user, setUser] = useState(null)


  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user }
      } = await supabase.auth.getUser()
      setUser(user)
    }

    getUser()

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null)
    })

    return () => listener?.subscription.unsubscribe()
  }, [])

 
  const handleClick =  async () => {
    if (!user) {
      alert("Login to Cash Out")
      navigate('/login')
      return 
    }else{
      alert("Redirecting to WhatsApp for payment")
      const cartDetails = products
    .filter((item) => cartItems[item.id] > 0)
    .map((item) => {
      return `${item.name} x ${cartItems[item.id]} = ₦${item.price * cartItems[item.id]}`;
    })
    .join('%0A');

  const total = products.reduce((acc, item) => {
    return acc + item.price * cartItems[item.id];
  }, 0);

  const message = `Hello! I would like to order:%0A${cartDetails}%0A%0ATotal: ₦${total}`;

  const phoneNumber = '2348131906385';

  const url = `https://wa.me/${phoneNumber}?text=${message}`;

  window.open(url, '_blank');
    }

}

    

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
             <button className='bg-black text-white rounded-xl p-3 hover:bg-gray-500 pointer cursor'><Link to='/products'>Continue Shopping</Link></button>
             <button onClick={handleClick} className='bg-black text-white rounded-xl p-3 hover:bg-gray-500 poniter cursor'>
             {user ? "Cash Out" : "Login to Cash Out"}</button>
             </div>
             </div>
          </div>
    </div>
  )
}

export default CartPage