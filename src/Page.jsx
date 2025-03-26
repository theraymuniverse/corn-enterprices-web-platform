import React from 'react'
import Nav from './Nav'
import Footer from './footer'
import {products} from './data/data'
import Cart from './component/cart'
import ShopContextProvider from './cartContext'

const Page = () => {
  return (
    <ShopContextProvider>
    <div>
        <Nav/>
        
        <section className='bg-white lg:px-[70px] md:px-[40px] py-[50px] conatiner'>
        <div className='text-center text-black' >
          <h1 className='text-[30px] lg:text-[50px] font-bold  md:text-[40px]'>
            Our Variety of Products
          </h1>
          <p className='text-[10px] lg:text-[15px] pt-[10px] '>Select the best products the market has to offer.</p>
        </div>
       
        <div className='grid place-items-center py-15 text-black '>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-start gap-5 md:gap-10 lg:gap-18'>
                {products?.map((item) => {
                    return (
                   <Cart key={item.id} item={item}/>
                )
                })}
            </div>
        </div>
        </section>

        <footer>
            <Footer/>
        </footer>
    </div>
    </ShopContextProvider>
  )
}

export default Page