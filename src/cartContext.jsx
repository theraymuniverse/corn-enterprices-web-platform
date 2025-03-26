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

      const addToCart = (itemId) => {
        setCart((prev) => ({...prev, [itemId]: prev[itemId] + 1 }));
    };
    const removeFromCart = (itemId) => {
        setCart((prev) => ({...prev, [itemId]: prev[itemId] - 1 }));
    };
     
    const contextValue = {cartItems, addToCart, removeFromCart}

     console.log(cartItems);
  return (
        <ShopContext.Provider value = {contextValue}>
           {props.children}
        </ShopContext.Provider>
  )
}

export default ShopContextProvider