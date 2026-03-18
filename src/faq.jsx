import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, HelpCircle, MessageCircle, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const faqs = [
  {
    question: 'Who can apply for a loan?',
    answer:
      'Our loan services are available to salary earners, civil servants, business owners, and small or medium-sized enterprises (SMEs) operating within Taraba State and Abuja.',
  },
  {
    question: 'What types of loans do you offer?',
    answer:
      'We provide three primary lending options: Personal Soft Loans, Salary Advance, and SME Business Loans. Each option is designed to provide quick and flexible financial support depending on the applicant\'s needs.',
    list: ['Personal Soft Loans', 'Salary Advance', 'SME Business Loans'],
  },
  {
    question: 'How long does the loan approval process take?',
    answer:
      'Once all required documents are submitted and verified, loan approval may take less than three minutes.',
  },
  {
    question: 'How quickly are funds disbursed?',
    answer:
      'After approval, funds are released immediately, allowing clients to attend to urgent financial needs without delay.',
  },
  {
    question: 'What documents are required to apply?',
    answer: 'Applicants are required to provide the following:',
    list: [
      'A valid work identification card',
      'Recent salary slips or proof of income',
      'Details of an eligible guarantor',
    ],
    note: 'These requirements help us ensure responsible lending practices.',
  },
  {
    question: 'What is the maximum loan repayment period?',
    answer:
      'Loans are structured with a maximum repayment period of five months, allowing clients to repay comfortably.',
  },
  {
    question: 'Do I need collateral to access a loan?',
    answer:
      'No physical collateral is required. However, applicants must provide a qualified guarantor during the application process.',
  },
  {
    question: 'How is interest calculated?',
    answer:
      'Our loans operate on a reducing balance interest structure, meaning interest is calculated based on the remaining balance as repayments are made — reducing your cost over time.',
  },
  {
    question: 'How can I apply for a loan?',
    answer: 'You can apply through either of the following channels:',
    list: [
      'Completing the loan application form on our website',
      'Contacting us through our WhatsApp support line for quick assistance',
    ],
  },
]

const FAQItem = ({ faq, index, isOpen, onToggle }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
        isOpen
          ? 'border-[#3dba6f]/50 shadow-md shadow-green-100'
          : 'border-gray-100 hover:border-green-200 shadow-sm'
      }`}
    >
      {/* Question row */}
      <button
        onClick={onToggle}
        className='w-full flex items-center justify-between gap-4 px-6 py-5 text-left bg-white'
      >
        <div className='flex items-center gap-4'>
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-[13px] font-bold transition-colors duration-300 ${
            isOpen ? 'bg-[#1a4731] text-white' : 'bg-[#f0f9f4] text-[#1a4731]'
          }`}>
            {String(index + 1).padStart(2, '0')}
          </div>
          <span className={`font-semibold text-[15px] md:text-[16px] transition-colors duration-200 ${
            isOpen ? 'text-[#1a4731]' : 'text-gray-800'
          }`}>
            {faq.question}
          </span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors duration-300 ${
            isOpen ? 'bg-[#3dba6f] text-white' : 'bg-gray-100 text-gray-500'
          }`}
        >
          <ChevronDown size={16} />
        </motion.div>
      </button>

      {/* Answer panel */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className='px-6 pb-6 pt-1 bg-white border-t border-gray-50'>
              <div className='pl-12'>
                <p className='text-gray-600 text-[14px] md:text-[15px] leading-relaxed'>
                  {faq.answer}
                </p>
                {faq.list && (
                  <ul className='mt-3 space-y-2'>
                    {faq.list.map((item, i) => (
                      <li key={i} className='flex items-start gap-2.5 text-[14px] text-gray-600'>
                        <span className='w-1.5 h-1.5 rounded-full bg-[#3dba6f] flex-shrink-0 mt-2' />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
                {faq.note && (
                  <p className='mt-3 text-[13px] text-[#1a4731] font-medium italic'>
                    {faq.note}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0)

  const toggle = (i) => setOpenIndex(prev => (prev === i ? null : i))

  return (
    <div className='bg-white min-h-screen'>
      <section className='relative bg-[#1a4731] overflow-hidden'>
        <div className='absolute inset-0 opacity-5'
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '28px 28px' }} />
        <div className='absolute top-0 right-0 w-80 h-80 rounded-full bg-[#3dba6f]/15 blur-3xl pointer-events-none' />
        <div className='absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#3dba6f]/10 blur-3xl pointer-events-none' />

        <div className='relative z-10 max-w-3xl mx-auto px-6 md:px-12 py-20 md:py-28 text-center'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
          >
            <div className='flex items-center justify-center gap-3 mb-4'>
              <span className='h-px w-10 bg-[#3dba6f]' />
              <span className='text-[#3dba6f] text-xs font-semibold tracking-[0.22em] uppercase'>Help Centre</span>
              <span className='h-px w-10 bg-[#3dba6f]' />
            </div>
            <h1 className='text-white text-[34px] md:text-[50px] font-bold leading-tight'>
              Frequently Asked{' '}
              <span className='text-[#3dba6f]'>Questions</span>
            </h1>
            <p className='text-green-200/70 text-[16px] mt-5 max-w-2xl mx-auto leading-relaxed'>
              Common questions about our loan services — answered with the clarity and transparency
              you deserve. To ensure you can apply with full confidence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Intro strip ── */}
      <div className='bg-[#f0f9f4] border-b border-green-100'>
        <div className='max-w-4xl mx-auto px-6 md:px-12 py-6 flex items-center gap-3 text-[14px] text-gray-600'>
          <HelpCircle size={18} className='text-[#3dba6f] flex-shrink-0' />
          <p>
            Can't find what you're looking for?{' '}
            <a
              href='https://wa.me/2348131906385'
              target='_blank'
              rel='noreferrer'
              className='text-[#1a4731] font-semibold hover:text-[#3dba6f] transition-colors underline underline-offset-2'
            >
              Chat with us on WhatsApp
            </a>{' '}
            for instant assistance.
          </p>
        </div>
      </div>

      {/* ── FAQ List ── */}
      <section className='py-16 md:py-20 px-6 md:px-12 lg:px-20'>
        <div className='max-w-3xl mx-auto'>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className='text-center mb-10'
          >
            <h2 className='text-[#1a4731] text-[24px] md:text-[32px] font-bold'>
              Common Questions About Our Loan Services
            </h2>
            <p className='text-gray-500 text-[14px] mt-2'>
              Click any question below to expand the answer.
            </p>
          </motion.div>

          <div className='space-y-3'>
            {faqs.map((faq, i) => (
              <FAQItem
                key={i}
                faq={faq}
                index={i}
                isOpen={openIndex === i}
                onToggle={() => toggle(i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA block ── */}
      <section className='py-16 px-6 md:px-12 bg-[#f0f9f4]'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className='max-w-3xl mx-auto bg-[#1a4731] rounded-2xl px-8 md:px-12 py-10 text-center shadow-lg relative overflow-hidden'
        >
          <div className='absolute top-0 right-0 w-56 h-56 rounded-full bg-[#3dba6f]/15 blur-3xl pointer-events-none' />
          <div className='relative z-10'>
            <div className='w-14 h-14 rounded-2xl bg-[#3dba6f]/20 flex items-center justify-center mx-auto mb-5'>
              <MessageCircle size={26} className='text-[#3dba6f]' />
            </div>
            <h3 className='text-white font-bold text-[22px] md:text-[28px]'>
              Ready to Apply?
            </h3>
            <p className='text-green-200/70 text-[14px] md:text-[15px] mt-3 max-w-md mx-auto leading-relaxed'>
              With approvals in under 3 minutes and immediate disbursement, there's no reason to wait.
              Take the first step toward your financial goals today.
            </p>
            <div className='flex flex-col sm:flex-row items-center justify-center gap-4 mt-8'>
              <Link
                to='/contact_us'
                onClick={() => window.scrollTo(0, 0)}
                className='inline-flex items-center gap-2 bg-[#3dba6f] hover:bg-[#2ea85f] text-white font-bold text-[14px] px-7 py-3.5 rounded-full transition-all duration-300 shadow-md hover:scale-105'
              >
                Apply for a Loan <ArrowRight size={16} />
              </Link>
              <a
                href='https://wa.me/2348131906385'
                target='_blank'
                rel='noreferrer'
                className='inline-flex items-center gap-2 border border-white/30 hover:border-[#3dba6f] text-white/80 hover:text-[#3dba6f] font-semibold text-[14px] px-7 py-3.5 rounded-full transition-all duration-300'
              >
                <MessageCircle size={16} />
                WhatsApp Support
              </a>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  )
}

export default FAQ