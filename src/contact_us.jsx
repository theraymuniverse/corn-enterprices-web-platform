import React, { useState } from 'react'
import Form from './Form'
import { Mail, Phone, MapPin, MessageCircle, ArrowRight, ShieldCheck, Zap, BadgeCheck, Clock } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const WA_LINK = "https://wa.me/2348023447314?text=Hello%20COR'N%20Enterprises%20Limited%2C%20I%20would%20like%20to%20apply%20for%20a%20loan."

const contactDetails = [
  {
    icon: <Phone size={20} />,
    label: 'Phone',
    value: '08023447314',
    href: 'tel:08023447314',
  },
  {
    icon: <Mail size={20} />,
    label: 'Email',
    value: 'cornenterprises2709@gmail.com',
    href: 'mailto:cornenterprises2709@gmail.com',
  },
  {
    icon: <MapPin size={20} />,
    label: 'Office Address',
    value: 'TBS Plaza, Jalingo, Taraba State, Nigeria',
    href: null,
  },
]

const pillars = [
  { icon: <ShieldCheck size={16} />, label: 'Integrity' },
  { icon: <Zap size={16} />, label: 'Boldness' },
  { icon: <BadgeCheck size={16} />, label: 'Professionalism' },
]

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const contact_us = () => {
  return (
    <section id='contact' className='bg-white'>

      {/* ── Hero banner ── */}
      <div className='relative bg-[#1a4731] overflow-hidden'>
        <div className='absolute inset-0 opacity-5'
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '28px 28px' }} />
        <div className='absolute top-0 right-0 w-80 h-80 rounded-full bg-[#3dba6f]/15 blur-3xl pointer-events-none' />

        <div className='relative z-10 max-w-4xl mx-auto px-6 md:px-12 py-16 md:py-24 text-center'>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className='flex items-center justify-center gap-3 mb-4'>
              <span className='h-px w-10 bg-[#3dba6f]' />
              <span className='text-[#3dba6f] text-xs font-semibold tracking-[0.22em] uppercase'>Contact Us</span>
              <span className='h-px w-10 bg-[#3dba6f]' />
            </div>
            <h1 className='text-white text-[30px] md:text-[48px] font-bold leading-tight'>
              Take the First Step Toward{' '}
              <span className='text-[#3dba6f]'>Financial Relief</span>
            </h1>
            <p className='text-green-200/70 text-[15px] md:text-[17px] mt-4 max-w-2xl mx-auto leading-relaxed'>
              When financial needs arise, timely support can make all the difference.
              Our team is ready to provide the guidance and assistance you need —
              <span className='text-white font-medium'> simple, professional, and efficient.</span>
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── Main content: info + form ── */}
      <div className='py-16 px-6 md:px-12 lg:px-20 bg-[#f0f9f4]'>
        <div className='max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start'>

          {/* Left — info panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8 }}
          >
            {/* Intro text */}
            <div className='mb-8'>
              <p className='text-gray-600 text-[15px] leading-relaxed'>
                Whether you are a <span className='font-semibold text-[#1a4731]'>salary earner, civil servant, entrepreneur, or business owner</span>,
                our goal is to ensure that obtaining a loan remains simple, professional, and efficient.
                Reach out to our team or submit your loan application through our website.
              </p>
            </div>

            {/* Contact details */}
            <div className='space-y-4 mb-8'>
              {contactDetails.map((c, i) => (
                <div key={i} className='flex items-start gap-4 bg-white border border-green-100 rounded-2xl p-5 shadow-sm hover:border-[#3dba6f]/40 hover:shadow-md transition-all duration-200'>
                  <div className='w-10 h-10 rounded-xl bg-[#1a4731] text-[#3dba6f] flex items-center justify-center flex-shrink-0'>
                    {c.icon}
                  </div>
                  <div>
                    <p className='text-[#1a4731] font-semibold text-[13px] mb-0.5'>{c.label}</p>
                    {c.href
                      ? <a href={c.href} className='text-gray-500 text-[14px] hover:text-[#1a4731] transition-colors'>{c.value}</a>
                      : <p className='text-gray-500 text-[14px]'>{c.value}</p>
                    }
                  </div>
                </div>
              ))}
            </div>

            {/* WhatsApp instant apply card */}
            <div className='bg-[#1a4731] rounded-2xl p-6 text-white mb-8'>
              <div className='flex items-center gap-3 mb-3'>
                <div className='w-10 h-10 rounded-xl bg-[#3dba6f]/20 flex items-center justify-center'>
                  <MessageCircle size={20} className='text-[#3dba6f]' />
                </div>
                <div>
                  <h3 className='font-bold text-[15px]'>Apply Instantly via WhatsApp</h3>
                  <p className='text-green-200/60 text-[12px]'>Connect directly with our loan support team</p>
                </div>
              </div>
              <p className='text-green-200/70 text-[13px] leading-relaxed mb-5'>
                Prefer immediate assistance? Click the button below to open a direct WhatsApp conversation.
                A pre-filled message will be sent to our team on your behalf.
              </p>
              <a
                href={WA_LINK}
                target='_blank'
                rel='noreferrer'
                className='inline-flex items-center gap-2 bg-[#3dba6f] hover:bg-[#2ea85f] text-white font-bold text-[14px] px-6 py-3 rounded-full transition-all duration-300 shadow-md hover:shadow-[#3dba6f]/30 hover:scale-105 w-full justify-center'
              >
                <MessageCircle size={17} />
                Apply for a Loan via WhatsApp
              </a>
            </div>

            {/* Approval callout */}
            <div className='bg-white border border-green-100 rounded-2xl p-5 shadow-sm flex items-start gap-4'>
              <div className='w-10 h-10 rounded-xl bg-[#f0f9f4] text-[#3dba6f] flex items-center justify-center flex-shrink-0'>
                <Clock size={18} />
              </div>
              <div>
                <p className='text-[#1a4731] font-bold text-[14px] mb-1'>Approval in Under 3 Minutes</p>
                <p className='text-gray-500 text-[13px] leading-relaxed'>
                  Qualified applicants who submit the required documentation may receive loan approval
                  within minutes, followed by immediate disbursement of funds.
                </p>
              </div>
            </div>
            <div className='flex flex-wrap gap-3 mt-6'>
              {pillars.map((p, i) => (
                <div key={i} className='flex items-center gap-2 bg-[#f0f9f4] border border-green-100 text-[#1a4731] text-[12px] font-semibold px-4 py-2 rounded-full'>
                  <span className='text-[#3dba6f]'>{p.icon}</span>
                  {p.label}
                </div>
              ))}
            </div>
          </motion.div>

         
          <motion.div
            initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.15 }}
          >
            <div className='bg-white border border-green-100 rounded-2xl shadow-sm overflow-hidden'>
              <div className='bg-[#1a4731] px-7 py-5'>
                <h3 className='text-white font-bold text-[17px]'>Send Us a Message</h3>
                <p className='text-green-200/60 text-[13px] mt-0.5'>Our representatives will respond to your inquiry promptly</p>
              </div>
              <div className='p-7'>
                <Form />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className='bg-white py-14 px-6 md:px-12 border-t border-green-100'>
        <div className='max-w-4xl mx-auto text-center'>
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8 }}
          >
            <p className='text-[#1a4731] text-[13px] font-semibold tracking-[0.2em] uppercase mb-3'>Ready to Begin?</p>
            <h2 className='text-[#1a4731] text-[24px] md:text-[34px] font-bold mb-3'>
              Start Your Loan Application Today
            </h2>
            <p className='text-gray-500 text-[15px] max-w-xl mx-auto mb-8 leading-relaxed'>
              At COR'N Enterprises Limited, your financial needs deserve a partner that listens,
              responds quickly, and delivers with responsibility.
            </p>
            <div className='flex flex-wrap items-center justify-center gap-4'>
              <Link
                to='/contact_us'
                onClick={() => window.scrollTo(0, 0)}
                className='inline-flex items-center gap-2 bg-[#1a4731] hover:bg-[#2d7a4f] text-white font-bold text-[14px] px-7 py-3.5 rounded-full transition-all duration-300 shadow-md hover:shadow-green-800/20 hover:scale-105'
              >
                Apply Online <ArrowRight size={16} />
              </Link>
              <a
                href={WA_LINK}
                target='_blank'
                rel='noreferrer'
                className='inline-flex items-center gap-2 border border-green-200 hover:border-[#3dba6f] text-[#1a4731] hover:text-[#3dba6f] text-[14px] font-semibold px-7 py-3.5 rounded-full transition-all duration-300'
              >
                <MessageCircle size={16} />
                Apply via WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </div>

    </section>
  )
}

export default contact_us