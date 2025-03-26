import React, { useContext } from 'react'
import products from './data/data'
import { ShopContext } from './cartContext'

const CartPage = () => {
    const {cartItems} = useContext(ShopContext)
    
  return (
    <div className=''>
          <div>
            <h1> Items in your Cart</h1>
          </div>
          <div>
            {products.map((product)=> {
                if (cartItems[product.id] !== 0){
                    return <CartItem data={product}/>
                }
            })}
          </div>
    </div>
  )
}

export default CartPage