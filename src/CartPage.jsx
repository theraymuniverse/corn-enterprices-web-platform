import React, { useContext, useState, useEffect } from 'react'
import products from './data/data'
import { ShopContext } from './cartContext'
import CartItem from './component/cartItem'
import Nav from './Nav'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { supabase } from './Authenticcation/supabaseClient'
import Popup from './component/Popup'
import { getItem, setItem } from './localstorage'

const CartPage = () => {
  const navigate = useNavigate(); 
    const { cartItems } = useContext(ShopContext)
    const [showpopup, setShowPopup] = useState(false)
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(false);
    const [whatsappUrl, setWhatsappUrl] = useState('');

    const [roles, setRoles] = useState(() => {
        const saved = localStorage.getItem('roles');
        return saved ? JSON.parse(saved) : {};
    });

    const setRoleInCart = (id, role) => {
        setRoles(prev => {
            const updated = { ...prev, [id]: role };
            localStorage.setItem('roles', JSON.stringify(updated));
            return updated;
        });
    };

    

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

 
  const handleClick = async () => {
    setIsLoading(true); 
    
  const missingRole = products.some(
    (item) => cartItems[item.id] > 0 && (!roles[item.id] || roles[item.id] === '')
  );
  if (missingRole) {
    alert('Please select a category (Kg, Bags, or Tons) for all items before cashing out.');
    return;
  }

  if (!user) {
    alert("Login to Cash Out");
    navigate('/login'); 
    return;
  }
 

  const cartDetails = products
    .filter((item) => cartItems[item.id] > 0)
    .map((item) => {
      const itemRole = roles[item.id] || "No quantity type selected";
      return `${item.name} ${(itemRole)} x ${cartItems[item.id]}`;
    })
    .join('%0A');

  const total = products.reduce((acc, item) => {
    return acc + cartItems[item.id];
  }, 0);

  const message = `Order Details %0A%0AProducts:%0A${cartDetails}%0ATotal Products: ${total} %0A`;

     const phoneNumber = '2348131906385';
     const url = `https://wa.me/${phoneNumber}?text=${message}`;
     setWhatsappUrl(url);

  try {
    const messageForEmail = decodeURIComponent(message).replace(/%0A/g, '<br/>');
    const response = await fetch('https://www.cornenterprise.com/api/send-sale', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: messageForEmail }),
    });
    const result = await response.json();
    if (response.ok) {
      setRoles({});
      localStorage.removeItem('roles');
      setShowPopup(true);
     
    } else {
      alert(result.message || 'Error sending email, please try again.');
    }
  } catch (err) {
    console.error('Error:', err);
    alert('Something went wrong. Please try again.');
  } finally{
     setIsLoading(false);
  }
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
    // Only show if quantity is greater than 0 (not blank or zero)
    if (cartItems[items.id] > 0) {
      return (
        <CartItem 
          key={items.id} 
          data={items} 
          setRoleInCart={setRoleInCart}
          role = {roles[items.id] || ''}
        />
      );
    }
})}
</div>
          <div className='Justify-center text-center pt-[20px]  '>
           {/*<p className='text-[20px] md:text-[30px]'>
                Subtotal: ₦{products.reduce((acc, item) => {
                    return acc + item.price * cartItems[item.id]
                }, 0)}
             </p>*/}  
             <div className='flex justify-center flex-row gap-6 pt-[40px]'>
             <button className='bg-black text-white rounded-xl p-3 hover:bg-gray-500 pointer cursor'><Link to='/products'>Continue Shopping</Link></button>
             <button onClick={handleClick} className='bg-black text-white rounded-xl p-3 hover:bg-gray-500 poniter cursor'>
                     {isLoading ? (
            <>
            <div className='flex flex-row gap-2'>
              <div class='h-2 w-2 bg-green-400 rounded-full animate-bounce [animation-delay:-0.3s]'></div>
              <div class='h-2 w-2 bg-green-400 rounded-full animate-bounce [animation-delay:-0.15s]'></div>
              <div class='h-2 w-2 bg-green-400 rounded-full animate-bounce'></div>
            </div>
            </>
               ) : (
                user ? "Cash Out" : "Login to Cash Out"
                 )}
             </button>
             </div>
             </div>
            {showpopup && (
              <Popup onClose={() => location.reload()}
               whatsappUrl={whatsappUrl}
                />
         )} 
          </div>
    </div>
  )
}

export default CartPage