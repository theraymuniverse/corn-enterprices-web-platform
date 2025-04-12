import React, { createContext, useState } from 'react'
import {products} from './data/data'

export const ShopContext = createContext(null);

const getDefaultCart = () => {
           let cart = {};
           for (let i = 1; i < products.length + 1; i++){
            cart[i] = 0;
           }
     return cart;
};

const ShopContextProvider = (props) => {
      const [cartItems, setCart] = useState(getDefaultCart());
      
      const getTotalCartItemCount = () => {
        return Object.values(cartItems).reduce((total, num) => total + num, 0);
      }

      const addToCart = (itemId) => {
        setCart((prev) => ({...prev, [itemId]: prev[itemId] + 1 }));
    };
    const removeFromCart = (itemId) => {
        setCart((prev) => ({...prev, [itemId]: prev[itemId] - 1 }));
    };

    const updateCartItemCount = (newAmount, itemId) => {
        setCart((prev) => ({...prev, [itemId]: newAmount }));
    }
     
    const contextValue = {cartItems, getTotalCartItemCount ,addToCart, removeFromCart, updateCartItemCount}

     console.log(cartItems);
  return (
        <ShopContext.Provider value = {contextValue}>
           {props.children}
        </ShopContext.Provider>
  )
}

export default ShopContextProvider