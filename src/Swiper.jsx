import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import ricey from './assets/rice 1.jpg'
import beany from './assets/bean 1.jpg'
import maziey from './assets/zeamays.jpg'
import ground from './assets/ground.jpg'
import soya from './assets/soya.jpg'

const Slider = () => {
  return (
    <div className='p-10 '>
         <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      spaceBetween={10}
      slidesPerView={1}
      Autoplay={true}
      navigation
      loop={true}
      autoplay={{ delay: 2500, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
    > <div className='i'>
      <SwiperSlide className="pb-6  ">
        <img className='rounded-xl duration-3  h-[350px]  md:h-[450px] justify-self-center ease-in-out hover:shadow-lg  ' src={ricey}/>
        <p className='text-green-500 text-[20px] font-semibold'>Processed Rice(parboiled, long grain, short grain)
</p>
      </SwiperSlide>
      <SwiperSlide>
        <img loading='lazy' className='rounded-xl duration-3  h-[350px] md:h-[400px] justify-self-center ease-in-out hover:shadow-lg  ' src={beany}/>
         <p className='text-green-500 text-[20px] font-semibold'>Beans</p>
      </SwiperSlide>
      <SwiperSlide>
        <img loading='lazy'  className='rounded-xl duration-3 h-[350px] md:h-[400px] justify-self-center ease-in-out hover:shadow-lg  ' src={maziey}/>
         <p className='text-green-500 text-[20px] font-semibold'>Maize (Yellow & White)</p>
      </SwiperSlide>
      <SwiperSlide>
        <img  loading='lazy' className='rounded-xl duration-3 h-[350px] md:h-[400px] justify-self-center ease-in-out hover:shadow-lg  ' src={ground}/>
         <p className='text-green-500 text-[20px] font-semibold'>Groundnut (Shelled or Unshelled)</p>
      </SwiperSlide>
       <SwiperSlide>
        <img  loading='lazy' className='rounded-xl duration-3 h-[350px] md:h-[400px] justify-self-center ease-in-out hover:shadow-lg  ' src={soya}/>
         <p className='text-green-500 text-[20px] font-semibold'>Soya Beans</p>
      </SwiperSlide>
      </div>
    </Swiper>
    </div>
  )
}

export default Slider