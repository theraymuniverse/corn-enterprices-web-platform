import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Clock, Banknote, RefreshCcw, FileCheck,
  ShieldCheck, BadgeCheck, Users, ArrowRight
} from 'lucide-react'

const reasons = [
  {
    icon: <Clock size={26} />,
    title: 'Fast Approval Process',
    desc: 'Our streamlined system allows qualified applicants to receive loan approval in less than three minutes once the required documents are verified.',
  },
  {
    icon: <Banknote size={26} />,
    title: 'Immediate Disbursement',
    desc: 'After approval, funds are released without delay — ensuring urgent needs and opportunities can be addressed immediately.',
  },
  {
    icon: <RefreshCcw size={26} />,
    title: 'Flexible Loan Structure',
    desc: 'Our loans operate on a reducing balance interest system, allowing clients to repay comfortably over time without unnecessary financial strain.',
  },
  {
    icon: <FileCheck size={26} />,
    title: 'Simple & Transparent Requirements',
    desc: 'With straightforward documentation and a clear process, applicants can complete their requests with ease and full clarity.',
  },
  {
    icon: <ShieldCheck size={26} />,
    title: 'Professional & Ethical Service',
    desc: 'Guided by Integrity, Boldness, and Professionalism — every client interaction is handled with fairness, respect, and accountability.',
  },
  {
    icon: <BadgeCheck size={26} />,
    title: 'Trusted & Registered',
    desc: 'Duly registered with the Corporate Affairs Commission (CAC) and operating under applicable consumer protection standards.',
  },
  {
    icon: <Users size={26} />,
    title: 'Support for the Underserved',
    desc: 'Providing reliable lending options to salary earners, civil servants, entrepreneurs, and SMEs who need timely, accessible support.',
  },
]

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const Chose = () => {
  const handleClick = () => window.scrollTo(0, 0)

  return (
    <section className='relative py-20 px-5 md:px-12 lg:px-24 bg-white overflow-hidden'>

      {/* Decorative background blobs */}
      <div className='absolute top-0 right-0 w-80 h-80 rounded-full bg-[#3dba6f]/8 blur-3xl pointer-events-none' />
      <div className='absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#1a4731]/5 blur-3xl pointer-events-none' />

      {/* Subtle grid texture */}
      <div className='absolute inset-0 opacity-[0.025]'
        style={{ backgroundImage: 'linear-gradient(#1a4731 1px, transparent 1px), linear-gradient(90deg, #1a4731 1px, transparent 1px)', backgroundSize: '40px 40px' }}
      />

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className='max-w-3xl mx-auto text-center mb-14 relative z-10'
      >
        <div className='flex items-center justify-center gap-3 mb-4'>
          <span className='h-px w-10 bg-[#3dba6f]' />
          <span className='text-[#3dba6f] text-xs font-semibold tracking-[0.22em] uppercase'>Our Advantage</span>
          <span className='h-px w-10 bg-[#3dba6f]' />
        </div>

        <h2 className='text-[#1a4731] text-[30px] md:text-[42px] font-bold leading-tight'>
          Why Choose{' '}
          <span className='relative inline-block'>
            COR'N Enterprises
            <span className='absolute -bottom-1 left-0 right-0 h-[3px] bg-[#3dba6f] rounded-full' />
          </span>{' '}
          Limited
        </h2>

        <p className='text-gray-500 text-[16px] md:text-[17px] mt-5 leading-relaxed'>
          Choosing a lending partner is not merely a financial decision — it is a matter of{' '}
          <span className='font-semibold text-[#1a4731]'>trust, reliability, and confidence.</span>{' '}
          Every service we provide is guided by a commitment to make borrowing simple, fair, and accessible.
        </p>
      </motion.div>

      {/* Reasons grid */}
      <motion.div
        variants={containerVariants}
        initial='hidden'
        whileInView='show'
        viewport={{ once: true }}
        className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto relative z-10'
      >
        {reasons.map((item, i) => (
          <motion.div
            key={i}
            variants={cardVariants}
            className={`group relative bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ${
              i === reasons.length - 1 && reasons.length % 3 !== 0
                ? 'sm:col-span-2 lg:col-span-1 lg:col-start-2'
                : ''
            }`}
          >
            {/* Icon badge */}
            <div className='w-12 h-12 rounded-xl bg-[#f0f9f4] text-[#1a4731] flex items-center justify-center mb-5 group-hover:bg-[#1a4731] group-hover:text-white transition-colors duration-300 border border-green-100'>
              {item.icon}
            </div>
            <h3 className='text-[#1a4731] font-bold text-[15px] mb-2'>{item.title}</h3>
            <p className='text-gray-500 text-[13px] leading-relaxed'>{item.desc}</p>
            {/* Hover accent line */}
            <div className='absolute bottom-0 left-0 right-0 h-[3px] rounded-b-2xl bg-[#3dba6f] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left' />
          </motion.div>
        ))}
      </motion.div>

      {/* Closing statement + CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.3 }}
        className='max-w-2xl mx-auto text-center mt-16 relative z-10'
      >
        <p className='text-[#1a4731] text-[15px] md:text-[16px] leading-relaxed font-medium italic border-l-4 border-[#3dba6f] pl-5 text-left bg-[#f0f9f4] py-4 pr-4 rounded-r-xl'>
          "At COR'N Enterprises Limited, lending is more than a service — it is a responsibility
          to help individuals and businesses move forward with confidence."
        </p>

        <Link to='/about'>
          <button
            onClick={handleClick}
            className='mt-10 inline-flex items-center gap-2 bg-[#1a4731] hover:bg-[#2d7a4f] text-white font-bold text-sm tracking-wide px-8 py-4 rounded-full transition-all duration-300 shadow-md hover:shadow-green-800/25 hover:scale-105'
          >
            Learn More About us
            <ArrowRight size={16} />
          </button>
        </Link>
      </motion.div>
    </section>
  )
}

export default Chose