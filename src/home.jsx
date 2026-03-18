import React, { useState, useEffect } from 'react'
import second from './assets/lol.jpg'
import { Link } from 'react-router-dom'
import { ChevronsDown, ShieldCheck, Zap, BadgeCheck } from 'lucide-react';
import { motion } from 'framer-motion'
import { HashLink } from 'react-router-hash-link';
import third from './assets/yu.jpg'
import fourth from './assets/pl.jpg'
import five from './assets/po.jpg'

const slides = [
  { img: fourth },
  { img: second },
  { img: third },
  { img: five },
]

const pillars = [
  { icon: <ShieldCheck size={18} />, label: 'Integrity' },
  { icon: <Zap size={18} />, label: 'Boldness' },
  { icon: <BadgeCheck size={18} />, label: 'Professionalism' },
]

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className='relative h-[600px] max-sm:h-[750px] md:h-[680px] overflow-hidden'>

      {/* Background image with deep green overlay */}
      <div className='absolute inset-0'>
        <img
          alt='hero background'
          src={slides[currentIndex].img}
          className='w-full h-full object-cover transition-opacity duration-1000'
        />
        {/* Rich green gradient overlay */}
        <div className='absolute inset-0 bg-gradient-to-br from-[#0d2b1a]/92 via-[#1a4731]/85 to-[#2d7a4f]/70' />
        {/* Bright green accent line at top */}
        <div className='absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#3dba6f] to-transparent' />
        {/* Subtle light pattern overlay */}
        <div className='absolute inset-0 opacity-5'
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}
        />
      </div>

      {/* Content */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.6, ease: 'easeOut' }}
        className='relative z-10 flex flex-col justify-center h-full px-8 md:px-16 lg:px-24 pt-[80px] md:pt-0 max-w-5xl mx-auto'
      >
        {/* Eyebrow tag */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className='inline-flex items-center gap-2 mb-4'
        >
          <span className='h-px w-8 bg-[#3dba6f]' />
          <span className='text-[#3dba6f] text-sm font-semibold tracking-[0.2em] uppercase'>
            COR'N Enterprises Limited
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1.2 }}
          className='text-white text-[38px] md:text-[54px] lg:text-[62px] font-bold leading-tight'
        >
          Flexible Loans.{' '}
          <span className='text-[#3dba6f]'>Trusted</span> Support.{' '}
          <br className='hidden md:block' />
          Immediate Relief.
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className='text-green-100/80 text-[16px] md:text-[18px] mt-4 max-w-2xl leading-relaxed'
        >
          When financial needs arise, time should not become an enemy. We provide fast,
          flexible, and professional lending solutions designed for{' '}
          <span className='text-white font-medium'>salary earners, civil servants, business owners, and SMEs</span>{' '}
          who need reliable financial support — without unnecessary stress.
        </motion.p>

        {/* Mission line */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 1 }}
          className='text-green-200/60 text-[14px] md:text-[15px] mt-3 max-w-xl italic'
        >
          Serving individuals and businesses across Taraba State and Abuja — especially
          those often overlooked by traditional banking systems.
        </motion.p>

        {/* Pillars */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className='flex flex-wrap gap-3 mt-6'
        >
          {pillars.map((p, i) => (
            <div key={i} className='flex items-center gap-2 bg-white/10 border border-[#3dba6f]/40 backdrop-blur-sm text-white text-sm px-4 py-2 rounded-full'>
              <span className='text-[#3dba6f]'>{p.icon}</span>
              {p.label}
            </div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className='flex flex-wrap gap-4 mt-8'
        >
          <Link
            to='/apply'
            className='bg-[#3dba6f] hover:bg-[#2ea85f] text-white font-bold text-sm tracking-wide px-7 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-[#3dba6f]/40 hover:scale-105'
          >
            Apply for a Loan
          </Link>
          <Link
            to='/about'
            className='border border-white/40 hover:border-[#3dba6f] text-white hover:text-[#3dba6f] text-sm font-semibold px-7 py-3 rounded-full transition-all duration-300'
          >
            Learn More
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <HashLink>
        <div className='hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 z-10'>
          <ChevronsDown className='animate-bounce border border-white/30 rounded-full text-white/60 hover:text-[#3dba6f] transition-colors' size={48} />
        </div>
      </HashLink>

      {/* Slide dots */}
      <div className='absolute bottom-6 right-8 z-10 flex gap-2'>
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === currentIndex ? 'w-6 bg-[#3dba6f]' : 'w-1.5 bg-white/30'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default Home