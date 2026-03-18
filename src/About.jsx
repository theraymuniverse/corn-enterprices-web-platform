import React from 'react'
import Nav from './Nav'
import Logo from './assets/Logo2.png'
import light from './assets/Light.jpg'
import Footer from './footer'
import biz from './assets/Biz.jpg'
import core from './assets/Core.jpg'
import { motion } from 'framer-motion'
import { ShieldCheck, Zap, BadgeCheck, Target, Eye, ArrowRight } from 'lucide-react'

const pillars = [
  {
    icon: <ShieldCheck size={26} />,
    title: 'Integrity',
    desc: 'We believe lending must be built on honesty, transparency, and fairness in every interaction.',
  },
  {
    icon: <Zap size={26} />,
    title: 'Boldness',
    desc: 'We act decisively to provide financial solutions where others hesitate — when our clients need us most.',
  },
  {
    icon: <BadgeCheck size={26} />,
    title: 'Professionalism',
    desc: 'Every client interaction reflects respect, clarity, and responsibility from first contact to final repayment.',
  },
]

const moments = [
  'A trader needs funds to restock urgently',
  'A salary earner faces an unexpected responsibility',
  'A small business needs a short financial lift to stay open',
]

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13 } },
}

const About = () => {
  return (
    <div className='bg-white min-h-screen'>
      <Nav />

      {/* ── Hero ── */}
      <section className='relative bg-[#1a4731] overflow-hidden'>
        <div className='absolute inset-0 opacity-5'
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '28px 28px' }} />
        <div className='absolute top-0 right-0 w-96 h-96 rounded-full bg-[#3dba6f]/15 blur-3xl pointer-events-none' />
        <div className='absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#3dba6f]/10 blur-3xl pointer-events-none' />

        <div className='relative z-10 max-w-6xl mx-auto px-6 md:px-12 lg:px-20 py-20 md:py-28 flex flex-col lg:flex-row items-center gap-12'>
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}
            className='flex-1 text-center lg:text-left'
          >
            <div className='flex items-center justify-center lg:justify-start gap-3 mb-4'>
              <span className='h-px w-10 bg-[#3dba6f]' />
              <span className='text-[#3dba6f] text-xs font-semibold tracking-[0.22em] uppercase'>About Us</span>
              <span className='h-px w-10 bg-[#3dba6f]' />
            </div>
            <h1 className='text-white text-[34px] md:text-[52px] font-bold leading-tight'>
              Every Thriving Community Deserves{' '}
              <span className='text-[#3dba6f]'>Financial Support</span>{' '}
              That Is Fair, Timely, and Respectful.
            </h1>
            <p className='text-green-200/70 text-[16px] mt-5 max-w-xl leading-relaxed'>
              Founded in <span className='text-white font-semibold'>2023</span>, COR'N Enterprises Limited was
              established with a clear purpose — to provide fast, flexible, and professional lending services
              to individuals and businesses who often find it difficult to access traditional financial support.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className='flex-shrink-0'
          >
            <div className='relative'>
              <div className='absolute -inset-3 rounded-full border-2 border-[#3dba6f]/20' />
              <img src={Logo} alt="COR'N Enterprises" loading='lazy'
                className='relative w-[160px] md:w-[200px] lg:w-[240px] p-4' />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── The Gap We Fill ── */}
      <section className='py-20 px-6 md:px-12 lg:px-20 bg-white'>
        <div className='max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-14'>

          <motion.div
            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8 }}
            className='flex-1'
          >
            <div className='flex items-center gap-3 mb-4'>
              <span className='h-px w-8 bg-[#3dba6f]' />
              <span className='text-[#3dba6f] text-xs font-semibold tracking-[0.2em] uppercase'>Our Purpose</span>
            </div>
            <h2 className='text-[#1a4731] text-[26px] md:text-[36px] font-bold leading-tight mb-5'>
              We Stand in the Gap —<br />
              <span className='text-[#3dba6f]'>When It Matters Most</span>
            </h2>
            <p className='text-gray-500 text-[15px] leading-relaxed mb-6'>
              Across many communities, hardworking people face moments when opportunity appears before cash does.
              In these moments, <span className='font-semibold text-[#1a4731]'>speed and trust matter.</span>
            </p>

            <div className='space-y-3 mb-7'>
              {moments.map((m, i) => (
                <div key={i} className='flex items-start gap-3 text-[14px] text-gray-600'>
                  <span className='w-5 h-5 rounded-full bg-[#f0f9f4] border border-[#3dba6f]/40 flex items-center justify-center flex-shrink-0 mt-0.5'>
                    <span className='w-2 h-2 rounded-full bg-[#3dba6f]' />
                  </span>
                  {m}
                </div>
              ))}
            </div>

            <p className='text-gray-500 text-[15px] leading-relaxed'>
              COR'N Enterprises Limited was created to stand in that gap — offering simple, transparent,
              and reliable lending solutions to{' '}
              <span className='font-semibold text-[#1a4731]'>salary earners, civil servants, entrepreneurs,
              and small business owners</span> across Taraba State and Abuja.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.15 }}
            className='flex-shrink-0'
          >
            <div className='relative'>
              <div className='absolute -inset-2 rounded-2xl border border-[#3dba6f]/20' />
              <img src={light} alt="COR'N Enterprises" loading='lazy'
                className='relative w-[260px] md:w-[320px] lg:w-[380px] h-[320px] md:h-[380px] object-cover rounded-2xl shadow-lg' />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Three Pillars ── */}
      <section className='py-20 px-6 md:px-12 lg:px-20 bg-[#f0f9f4]'>
        <div className='max-w-5xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8 }}
            className='text-center mb-12'
          >
            <div className='flex items-center justify-center gap-3 mb-3'>
              <span className='h-px w-8 bg-[#3dba6f]' />
              <span className='text-[#3dba6f] text-xs font-semibold tracking-[0.2em] uppercase'>Our Approach</span>
              <span className='h-px w-8 bg-[#3dba6f]' />
            </div>
            <h2 className='text-[#1a4731] text-[26px] md:text-[36px] font-bold'>
              Guided by Three Enduring Pillars
            </h2>
          </motion.div>

          <motion.div
            variants={containerVariants} initial='hidden' whileInView='show' viewport={{ once: true }}
            className='grid grid-cols-1 md:grid-cols-3 gap-6'
          >
            {pillars.map((p, i) => (
              <motion.div key={i} variants={cardVariants}
                className='group bg-white border border-green-100 rounded-2xl p-8 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-center'
              >
                <div className='w-14 h-14 rounded-2xl bg-[#f0f9f4] text-[#1a4731] flex items-center justify-center mx-auto mb-5 group-hover:bg-[#1a4731] group-hover:text-white transition-colors duration-300'>
                  {p.icon}
                </div>
                <h3 className='text-[#1a4731] font-bold text-[18px] mb-3'>{p.title}</h3>
                <p className='text-gray-500 text-[14px] leading-relaxed'>{p.desc}</p>
                <div className='mt-5 h-[2px] w-10 bg-[#3dba6f] mx-auto rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Mission & Vision ── */}
      <section className='py-20 px-6 md:px-12 lg:px-20 bg-white'>
        <div className='max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-14'>

          <motion.div
            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8 }}
            className='flex-shrink-0'
          >
            <img src={biz} alt='Our Mission' loading='lazy'
              className='w-[260px] md:w-[320px] lg:w-[380px] h-[280px] md:h-[340px] object-cover rounded-2xl shadow-lg' />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.15 }}
            className='flex-1 space-y-8'
          >
            <div>
              <div className='flex items-center gap-3 mb-3'>
                <div className='w-9 h-9 rounded-xl bg-[#1a4731] text-[#3dba6f] flex items-center justify-center'>
                  <Target size={18} />
                </div>
                <h3 className='text-[#1a4731] font-bold text-[22px]'>Our Mission</h3>
              </div>
              <p className='text-gray-500 text-[15px] leading-relaxed pl-12'>
                To become the most flexible and professional lending company for the everyday individual —
                providing simple, transparent, and swift financial solutions that empower salary earners,
                civil servants, business owners, and SMEs to achieve their financial goals.
              </p>
            </div>

            <div className='h-px bg-green-100' />

            <div>
              <div className='flex items-center gap-3 mb-3'>
                <div className='w-9 h-9 rounded-xl bg-[#1a4731] text-[#3dba6f] flex items-center justify-center'>
                  <Eye size={18} />
                </div>
                <h3 className='text-[#1a4731] font-bold text-[22px]'>Our Vision</h3>
              </div>
              <p className='text-gray-500 text-[15px] leading-relaxed pl-12'>
                To grow steadily into a leading lending institution within the next decade — trusted by
                individuals and businesses across Nigeria for fast, fair, and accessible financial services.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Core Values ── */}
      <section className='py-20 px-6 md:px-12 lg:px-20 bg-[#f0f9f4]'>
        <div className='max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-14'>

          <motion.div
            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8 }}
            className='flex-1'
          >
            <div className='flex items-center gap-3 mb-4'>
              <span className='h-px w-8 bg-[#3dba6f]' />
              <span className='text-[#3dba6f] text-xs font-semibold tracking-[0.2em] uppercase'>What Drives Us</span>
            </div>
            <h2 className='text-[#1a4731] text-[26px] md:text-[36px] font-bold mb-8'>Our Core Values</h2>

            <div className='space-y-5'>
              {[
                { label: 'Integrity', desc: 'If we say it, we will do it. Our word is our bond to every client.' },
                { label: 'Excellence', desc: 'We are never short of standard. Every loan, every service, every interaction.' },
                { label: 'Fruitfulness', desc: 'Our products and services are always available to those who need them most.' },
                { label: 'Growth', desc: 'You never meet us at the same place twice. We constantly improve for our clients.' },
              ].map((v, i) => (
                <div key={i} className='flex items-start gap-4 bg-white border border-green-100 rounded-xl p-5 shadow-sm hover:border-[#3dba6f]/40 hover:shadow-md transition-all duration-200'>
                  <div className='w-2 h-2 rounded-full bg-[#3dba6f] flex-shrink-0 mt-2' />
                  <div>
                    <span className='text-[#1a4731] font-bold text-[15px]'>{v.label}: </span>
                    <span className='text-gray-500 text-[14px]'>{v.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.15 }}
            className='flex-shrink-0'
          >
            <img src={core} alt='Core Values' loading='lazy'
              className='w-[260px] md:w-[320px] lg:w-[380px] h-[320px] md:h-[400px] object-cover rounded-2xl shadow-lg' />
          </motion.div>
        </div>
      </section>

      {/* ── Closing commitment ── */}
      <section className='py-20 px-6 md:px-12 lg:px-20 bg-[#1a4731] relative overflow-hidden'>
        <div className='absolute inset-0 opacity-5'
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '28px 28px' }} />
        <div className='absolute top-0 right-0 w-80 h-80 rounded-full bg-[#3dba6f]/15 blur-3xl pointer-events-none' />

        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.9 }}
          className='relative z-10 max-w-3xl mx-auto text-center'
        >
          <div className='flex items-center justify-center gap-3 mb-5'>
            <span className='h-px w-10 bg-[#3dba6f]' />
            <span className='text-[#3dba6f] text-xs font-semibold tracking-[0.22em] uppercase'>Our Commitment</span>
            <span className='h-px w-10 bg-[#3dba6f]' />
          </div>

          <blockquote className='text-white text-[20px] md:text-[26px] font-light leading-relaxed italic'>
            "At COR'N Enterprises Limited, lending is not merely a transaction. It is a commitment —
            to empower ambition, support responsibility, and strengthen the financial confidence of
            the communities we serve."
          </blockquote>

          <div className='mt-8 h-px w-16 bg-[#3dba6f] mx-auto rounded-full' />
          <p className='text-green-200/60 text-[14px] mt-4'>COR'N Enterprises Limited — Est. 2023</p>
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}

export default About