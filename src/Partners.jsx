import React from 'react'
import fourth from './assets/pp.jpg'
import partner from './assets/partner.png'
import Marquee from "react-fast-marquee";
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Users, TrendingUp, ShieldCheck } from 'lucide-react'

const stats = [
  { value: '1,000+', label: 'Clients Served' },
  { value: '2023', label: 'Year Established' },
  { value: '2', label: 'States Covered' },
  { value: '< 3 min', label: 'Approval Time' },
]

const Partners = () => {
  const handleClick = () => window.scrollTo(0, 0)

  return (
    <section className='bg-white overflow-hidden'>

      {/* ── Partner CTA block ── */}
      <div className='relative py-20 px-6 md:px-12 lg:px-24'>
        {/* Subtle background accent */}
        <div className='absolute top-0 left-0 w-72 h-72 rounded-full bg-[#3dba6f]/6 blur-3xl pointer-events-none' />
        <div className='absolute bottom-0 right-0 w-56 h-56 rounded-full bg-[#1a4731]/5 blur-3xl pointer-events-none' />

        <div className='max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-14 lg:gap-20 relative z-10'>

          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className='flex-1'
          >
            <div className='flex items-center gap-3 mb-4'>
              <span className='h-px w-8 bg-[#3dba6f]' />
              <span className='text-[#3dba6f] text-xs font-semibold tracking-[0.22em] uppercase'>Partner With Us</span>
            </div>

            <h2 className='text-[#1a4731] text-[34px] md:text-[44px] lg:text-[50px] font-bold leading-tight'>
              Partner or Invest in{' '}
              <span className='relative inline-block'>
                COR'N Enterprises
                <span className='absolute -bottom-1 left-0 right-0 h-[3px] bg-[#3dba6f] rounded-full' />
              </span>
              {' '}Limited.
            </h2>

            <p className='text-gray-500 text-[16px] md:text-[17px] mt-5 leading-relaxed max-w-lg'>
              Join forces with a company trusted by over{' '}
              <span className='font-semibold text-[#1a4731]'>1,000+ clients</span> across Taraba State and Abuja.
              Become an accredited partner or valued investor in one of Nigeria's fastest-growing
              lending companies — built on integrity, boldness, and professionalism.
            </p>

            {/* Benefit pills */}
            <div className='flex flex-wrap gap-3 mt-6'>
              {[
                { icon: <ShieldCheck size={15} />, text: 'CAC Registered' },
                { icon: <TrendingUp size={15} />, text: 'Fast-Growing Brand' },
                { icon: <Users size={15} />, text: 'Community Impact' },
              ].map((pt, i) => (
                <div key={i} className='flex items-center gap-2 bg-[#f0f9f4] border border-green-100 text-[#1a4731] text-[13px] font-medium px-4 py-2 rounded-full'>
                  <span className='text-[#3dba6f]'>{pt.icon}</span>
                  {pt.text}
                </div>
              ))}
            </div>

            <Link to='/partner'>
              <button
                onClick={handleClick}
                className='mt-8 inline-flex items-center gap-2 bg-[#1a4731] hover:bg-[#2d7a4f] text-white font-bold text-[14px] px-7 py-3.5 rounded-full transition-all duration-300 shadow-md hover:shadow-green-800/25 hover:scale-105'
              >
                Join Now <ArrowRight size={16} />
              </button>
            </Link>
          </motion.div>

          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className='flex-shrink-0 relative'
          >
            {/* Decorative ring behind image */}
            <div className='absolute -inset-3 rounded-2xl border-2 border-[#3dba6f]/20' />
            <img
              loading='lazy'
              src={fourth}
              alt="Partner with COR\'N Enterprises"
              className="relative w-full max-w-[420px] md:w-[420px] h-[360px] md:h-[480px] object-cover rounded-2xl shadow-xl"
            />
            {/* Floating stat badge */}
            <div className='absolute -bottom-5 -left-5 bg-[#1a4731] text-white rounded-2xl px-5 py-4 shadow-xl'>
              <p className='text-[#3dba6f] text-[22px] font-bold leading-none'>1,000+</p>
              <p className='text-green-200/70 text-[12px] mt-0.5'>Clients Served</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Stats strip ── */}
      <div className='bg-[#1a4731] py-10 px-6 md:px-12'>
        <div className='max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center'>
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <p className='text-[#3dba6f] text-[28px] md:text-[34px] font-bold leading-none'>{s.value}</p>
              <p className='text-green-200/60 text-[13px] mt-1'>{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Our Partners marquee ── */}
      <div className='bg-[#f0f9f4] py-16 px-6'>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className='text-center mb-10'
        >
          <div className='flex items-center justify-center gap-3 mb-3'>
            <span className='h-px w-8 bg-[#3dba6f]' />
            <span className='text-[#3dba6f] text-xs font-semibold tracking-[0.22em] uppercase'>Trusted Partners</span>
            <span className='h-px w-8 bg-[#3dba6f]' />
          </div>
          <h2 className='text-[#1a4731] text-[26px] md:text-[36px] font-bold'>Our Partners</h2>
        </motion.div>

        <Marquee gradient={false} speed={40} pauseOnHover>
          <div className='flex items-center gap-14 px-8 mr-14'>
            <div className='flex items-center gap-5 bg-white border border-green-100 rounded-2xl px-8 py-5 shadow-sm hover:shadow-md hover:border-[#3dba6f]/40 transition-all duration-300'>
              <img
                src={partner}
                alt='LBO Global Services'
                className='w-[60px] h-[42px] object-contain opacity-80 hover:opacity-100 transition-opacity'
              />
              <span className='text-[#1a4731] font-bold text-[16px] md:text-[18px] whitespace-nowrap'>
                LBO GLOBAL SERVICES
              </span>
            </div>

            {/* Spacer duplicate for continuous loop feel */}
            <div className='flex items-center gap-5 bg-white border border-green-100 rounded-2xl px-8 py-5 shadow-sm hover:shadow-md hover:border-[#3dba6f]/40 transition-all duration-300'>
              <img
                src={partner}
                alt='LBO Global Services'
                className='w-[60px] h-[42px] object-contain opacity-80 hover:opacity-100 transition-opacity'
              />
              <span className='text-[#1a4731] font-bold text-[16px] md:text-[18px] whitespace-nowrap'>
                LBO GLOBAL SERVICES
              </span>
            </div>
          </div>
        </Marquee>

        {/* Partner CTA note */}
        <p className='text-center text-gray-400 text-[13px] mt-10 italic'>
          Interested in becoming a partner?{' '}
          <Link to='/partner' onClick={handleClick} className='text-[#1a4731] font-semibold hover:text-[#3dba6f] transition-colors underline underline-offset-2'>
            Apply here
          </Link>
        </p>
      </div>

    </section>
  )
}

export default Partners