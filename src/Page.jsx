import React, { useState } from 'react'
import Nav from './Nav'
import Footer from './footer'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  User, Briefcase, Building2, CheckCircle,
  FileText, ShieldCheck, Zap, Clock, Banknote,
  ArrowRight, ChevronRight, MessageCircle,
  Lock, ScrollText, ChevronDown, ChevronUp, Mail, Phone
} from 'lucide-react'

const loanProducts = [
  {
    icon: <User size={28} />,
    title: 'Personal Soft Loans',
    tagline: 'A calm financial cushion when personal obligations arise.',
    desc: 'Life occasionally presents financial responsibilities that require immediate attention. Our Personal Soft Loans provide quick financial support to help you manage important needs without unnecessary delay.',
    features: [
      'Available to verified salary earners',
      'Loan access up to ₦100,000',
      'Maximum repayment period of 3 months',
      'Reducing balance interest structure',
      'Fast approval and immediate disbursement',
    ],
    accent: '#3dba6f',
  },
  {
    icon: <Briefcase size={28} />,
    title: 'Salary Advance',
    tagline: 'Your earnings can work when you need them most.',
    desc: 'Waiting for payday should not prevent you from solving urgent needs. Our Salary Advance facility allows eligible employees to access a portion of their income ahead of time.',
    features: [
      'Designed for salary earners and civil servants',
      'Maximum access of ₦100,000',
      'Quick verification process',
      'Approval within minutes once requirements are met',
      'Flexible repayment structure',
    ],
    accent: '#1a4731',
  },
  {
    icon: <Building2 size={28} />,
    title: 'SME Business Loans',
    tagline: 'When businesses grow, communities grow with them.',
    desc: 'Small businesses are the heartbeat of local economies. Our SME Loans are designed to support entrepreneurs who need quick capital to restock, seize opportunities, and sustain growth.',
    features: [
      'Loan access up to ₦300,000',
      'Designed for small and medium-sized businesses',
      'Repayment period of up to 5 months',
      'Fair reducing balance interest structure',
      'Fast processing and immediate fund release',
    ],
    accent: '#2d7a4f',
  },
]

const steps = [
  {
    num: '01',
    icon: <FileText size={22} />,
    title: 'Submit Your Loan Application',
    desc: 'Complete the loan application form on our website or contact our team through the WhatsApp support line. Our representatives are always ready to guide you.',
  },
  {
    num: '02',
    icon: <ShieldCheck size={22} />,
    title: 'Provide Required Documents',
    desc: 'Submit a valid work ID card, recent salary payment slips, and details of an eligible guarantor. These ensure responsible lending for both client and company.',
  },
  {
    num: '03',
    icon: <Zap size={22} />,
    title: 'Quick Verification',
    desc: 'Our team conducts a brief verification process to confirm the information provided — handled professionally and with confidentiality.',
  },
  {
    num: '04',
    icon: <Clock size={22} />,
    title: 'Instant Approval',
    desc: 'After successful verification, qualified applicants receive loan approval in less than three minutes.',
  },
  {
    num: '05',
    icon: <Banknote size={22} />,
    title: 'Immediate Disbursement',
    desc: 'Upon approval, funds are released immediately — allowing you to attend to your financial needs without delay.',
  },
]

const privacySections = [
  {
    title: 'Information We Collect',
    content: [
      'Personal details: full name, contact information, residential address',
      'Employment details: employer name, position, income',
      'Financial information: salary slips, bank account details',
      'Guarantor information',
      'Documents uploaded for verification purposes',
    ],
  },
  {
    title: 'How We Use Your Information',
    content: [
      'Verify your eligibility for loans',
      'Process and approve loan applications',
      'Communicate updates regarding your application or loan status',
      'Comply with legal and regulatory requirements',
      'Improve our services and ensure client satisfaction',
    ],
  },
  {
    title: 'Data Protection',
    content: [
      'We implement strict security measures to protect your information from unauthorized access, disclosure, or misuse. All electronic and physical records are secured in compliance with Nigerian financial regulations.',
    ],
  },
  {
    title: 'Sharing Your Information',
    content: [
      'We do not sell or rent your personal information.',
      'Authorized employees of COR\'N Enterprises Limited',
      'Regulatory or legal authorities, if required by law',
      'Approved financial partners for the purpose of loan processing',
    ],
  },
  {
    title: 'Your Rights',
    content: [
      'Request access to your personal information',
      'Request corrections to any inaccurate information',
      'Withdraw consent for the use of your data, where applicable',
    ],
  },
  {
    title: 'Policy Updates',
    content: [
      'COR\'N Enterprises Limited may update this policy from time to time. Clients are encouraged to review this page periodically for any changes.',
    ],
  },
]

const termsSections = [
  {
    title: 'Eligibility',
    content: [
      'Applicants must be salary earners, civil servants, or registered business owners/SMEs within Taraba State or Abuja',
      'A qualified guarantor is required for all loans',
      'Applicants must provide valid identification and proof of income',
    ],
  },
  {
    title: 'Loan Amount and Repayment',
    content: [
      'Personal loans and salary advances: maximum ₦100,000',
      'SME loans: maximum ₦300,000',
      'Maximum repayment period: 5 months',
      'Interest is calculated on a reducing balance structure',
    ],
  },
  {
    title: 'Loan Application and Approval',
    content: [
      'Loan applications can be submitted via the website form or WhatsApp',
      'Approval is subject to verification of documents and guarantor eligibility',
      'Approval decisions are final and at the discretion of COR\'N Enterprises Limited',
    ],
  },
  {
    title: 'Disbursement',
    content: [
      'Approved loans are disbursed immediately into the applicant\'s verified account',
      'COR\'N Enterprises Limited reserves the right to delay disbursement in cases of incomplete or inaccurate information',
    ],
  },
  {
    title: 'Default and Late Payment',
    content: [
      'Late payments may attract additional interest charges as determined at the time of agreement',
      'Continuous default may result in collection procedures through authorized channels, including communication with guarantors',
    ],
  },
  {
    title: 'Confidentiality',
    content: [
      'All client information is kept confidential and used solely for loan processing and compliance purposes',
      'COR\'N Enterprises Limited follows data protection standards to ensure the security of client information',
    ],
  },
  {
    title: 'Amendments',
    content: [
      'COR\'N Enterprises Limited reserves the right to update or modify these Terms & Conditions at any time',
      'Clients will be informed of significant changes via email or the company website',
    ],
  },
]

// Reusable accordion section
const AccordionItem = ({ title, content, index }) => {
  const [open, setOpen] = useState(false)
  return (
    <div className={`border rounded-xl overflow-hidden transition-all duration-200 ${open ? 'border-[#3dba6f]/50 shadow-sm' : 'border-gray-100'}`}>
      <button
        onClick={() => setOpen(!open)}
        className='w-full flex items-center justify-between px-6 py-4 text-left hover:bg-[#f0f9f4] transition-colors duration-200'
      >
        <div className='flex items-center gap-3'>
          <span className='text-[#3dba6f] text-[12px] font-bold tabular-nums'>0{index + 1}</span>
          <span className='text-[#1a4731] font-semibold text-[15px]'>{title}</span>
        </div>
        {open
          ? <ChevronUp size={18} className='text-[#3dba6f] flex-shrink-0' />
          : <ChevronDown size={18} className='text-gray-400 flex-shrink-0' />}
      </button>
      {open && (
        <div className='px-6 pb-5 pt-1 bg-white border-t border-gray-50'>
          <ul className='space-y-2'>
            {content.map((item, i) => (
              <li key={i} className='flex items-start gap-2.5 text-[13px] text-gray-600 leading-relaxed'>
                <span className='w-1.5 h-1.5 rounded-full bg-[#3dba6f] flex-shrink-0 mt-1.5' />
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: 'easeOut' } },
}
const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13 } },
}

const Page = () => {
  return (
    <div className='bg-white min-h-screen'>
      <Nav />

      {/* ── Hero ── */}
      <section className='relative bg-[#1a4731] overflow-hidden'>
        <div className='absolute inset-0 opacity-5'
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '28px 28px' }} />
        <div className='absolute top-0 right-0 w-96 h-96 rounded-full bg-[#3dba6f]/15 blur-3xl pointer-events-none' />
        <div className='absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#3dba6f]/10 blur-3xl pointer-events-none' />

        <div className='relative z-10 max-w-4xl mx-auto px-6 md:px-12 py-20 md:py-28 text-center'>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
            <div className='flex items-center justify-center gap-3 mb-4'>
              <span className='h-px w-10 bg-[#3dba6f]' />
              <span className='text-[#3dba6f] text-xs font-semibold tracking-[0.22em] uppercase'>Loan Services</span>
              <span className='h-px w-10 bg-[#3dba6f]' />
            </div>
            <h1 className='text-white text-[32px] md:text-[50px] font-bold leading-tight'>
              Flexible Lending Solutions{' '}
              <span className='text-[#3dba6f]'>Designed for You</span>
            </h1>
            <p className='text-green-200/70 text-[16px] md:text-[18px] mt-5 max-w-2xl mx-auto leading-relaxed'>
              Financial needs rarely arrive with long notice. Our lending services are designed to be{' '}
              <span className='text-white font-medium'>simple, fast, and dependable</span> — giving
              individuals and businesses the financial breathing room they need to move forward with confidence.
            </p>
            <p className='text-green-200/50 text-[14px] mt-3'>
              Serving salary earners, civil servants, entrepreneurs, and growing businesses across{' '}
              <span className='text-green-200/80'>Taraba State and Abuja</span>.
            </p>
            <div className='flex flex-wrap items-center justify-center gap-4 mt-8'>
              <a href='#loan-products'
                className='inline-flex items-center gap-2 bg-[#3dba6f] hover:bg-[#2ea85f] text-white font-bold text-sm px-7 py-3.5 rounded-full transition-all duration-300 shadow-lg hover:shadow-[#3dba6f]/30 hover:scale-105'>
                View Loan Products <ArrowRight size={16} />
              </a>
              <a href='#how-to-apply'
                className='inline-flex items-center gap-2 border border-white/30 hover:border-[#3dba6f] text-white hover:text-[#3dba6f] text-sm font-semibold px-7 py-3.5 rounded-full transition-all duration-300'>
                How to Apply <ChevronRight size={16} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Loan Products ── */}
      <section id='loan-products' className='py-20 px-6 md:px-12 lg:px-20 bg-white'>
        <div className='max-w-6xl mx-auto'>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8 }} className='text-center mb-14'>
            <div className='flex items-center justify-center gap-3 mb-3'>
              <span className='h-px w-8 bg-[#3dba6f]' />
              <span className='text-[#3dba6f] text-xs font-semibold tracking-[0.2em] uppercase'>Our Products</span>
              <span className='h-px w-8 bg-[#3dba6f]' />
            </div>
            <h2 className='text-[#1a4731] text-[26px] md:text-[38px] font-bold'>Our Loan Products</h2>
            <p className='text-gray-500 text-[15px] mt-3 max-w-xl mx-auto'>
              Choose the lending solution that fits your situation. All products come with fast approval and immediate disbursement.
            </p>
          </motion.div>

          <motion.div variants={containerVariants} initial='hidden' whileInView='show'
            viewport={{ once: true }} className='grid grid-cols-1 md:grid-cols-3 gap-7'>
            {loanProducts.map((loan, i) => (
              <motion.div key={i} variants={cardVariants}
                className='group relative bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col'>
                {/* Top colour band */}
                <div className='h-1.5 w-full' style={{ backgroundColor: loan.accent }} />

                <div className='p-7 flex flex-col flex-1'>
                  {/* Icon */}
                  <div className='w-13 h-13 w-12 h-12 rounded-xl flex items-center justify-center mb-5 text-white'
                    style={{ backgroundColor: loan.accent }}>
                    {loan.icon}
                  </div>

                  <h3 className='text-[#1a4731] font-bold text-[18px] mb-2'>{loan.title}</h3>
                  <p className='text-gray-500 text-[13px] leading-relaxed mb-5'>{loan.desc}</p>

                  {/* Features */}
                  <div className='space-y-2.5 flex-1'>
                    <p className='text-[#1a4731] text-[12px] font-bold uppercase tracking-wider mb-3'>Key Features</p>
                    {loan.features.map((f, j) => (
                      <div key={j} className='flex items-start gap-2.5 text-[13px] text-gray-600'>
                        <CheckCircle size={15} className='flex-shrink-0 mt-0.5' style={{ color: loan.accent }} />
                        {f}
                      </div>
                    ))}
                  </div>

                  {/* Tagline */}
                  <p className='mt-6 text-[13px] italic font-medium border-t border-gray-100 pt-4'
                    style={{ color: loan.accent }}>
                    "{loan.tagline}"
                  </p>
                </div>

                {/* Hover bottom bar */}
                <div className='absolute bottom-0 left-0 right-0 h-[3px] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left'
                  style={{ backgroundColor: loan.accent }} />
              </motion.div>
            ))}
          </motion.div>

          {/* Closing promise */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }}
            className='mt-14 text-center max-w-2xl mx-auto'>
            <p className='text-gray-500 text-[15px] leading-relaxed'>
              Your financial progress deserves a lending partner that is{' '}
              <span className='font-semibold text-[#1a4731]'>reliable, transparent, and responsive.</span>
              <br />That is the promise upheld daily by COR'N Enterprises Limited.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── How to Apply ── */}
      <section id='how-to-apply' className='py-20 px-6 md:px-12 lg:px-20 bg-[#f0f9f4]'>
        <div className='max-w-5xl mx-auto'>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8 }} className='text-center mb-14'>
            <div className='flex items-center justify-center gap-3 mb-3'>
              <span className='h-px w-8 bg-[#3dba6f]' />
              <span className='text-[#3dba6f] text-xs font-semibold tracking-[0.2em] uppercase'>Loan Application Process</span>
              <span className='h-px w-8 bg-[#3dba6f]' />
            </div>
            <h2 className='text-[#1a4731] text-[26px] md:text-[38px] font-bold'>A Quick & Easy Way to Access Financial Support</h2>
            <p className='text-gray-500 text-[15px] mt-3 max-w-xl mx-auto'>
              Our application process is designed to be straightforward, transparent, and efficient —
              from application to disbursement, every step saves time while maintaining professional standards.
            </p>
          </motion.div>

          {/* Steps */}
          <div className='relative'>
            {/* Vertical connector line (desktop) */}
            <div className='hidden md:block absolute left-[39px] top-10 bottom-10 w-[2px] bg-green-100' />

            <motion.div variants={containerVariants} initial='hidden' whileInView='show'
              viewport={{ once: true }} className='space-y-6'>
              {steps.map((step, i) => (
                <motion.div key={i} variants={cardVariants}
                  className='group flex flex-col md:flex-row items-start gap-5 bg-white border border-green-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-[#3dba6f]/40 transition-all duration-300'>
                  {/* Step number badge */}
                  <div className='relative flex-shrink-0 z-10'>
                    <div className='w-[52px] h-[52px] rounded-full bg-[#1a4731] group-hover:bg-[#3dba6f] text-white flex items-center justify-center transition-colors duration-300 shadow-md'>
                      {step.icon}
                    </div>
                    <span className='absolute -top-1.5 -right-1.5 bg-[#3dba6f] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full leading-none'>
                      {step.num}
                    </span>
                  </div>
                  <div className='flex-1'>
                    <h3 className='text-[#1a4731] font-bold text-[16px] mb-1.5'>{step.title}</h3>
                    <p className='text-gray-500 text-[14px] leading-relaxed'>{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Closing note */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }}
            className='mt-12 text-center'>
            <p className='text-gray-500 text-[15px] max-w-xl mx-auto leading-relaxed'>
              With COR'N Enterprises Limited,{' '}
              <span className='font-semibold text-[#1a4731]'>financial support is never far away.</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className='bg-[#1a4731] py-16 px-6 md:px-12 relative overflow-hidden'>
        <div className='absolute inset-0 opacity-5'
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '28px 28px' }} />
        <div className='absolute right-0 top-0 w-72 h-72 rounded-full bg-[#3dba6f]/15 blur-3xl pointer-events-none' />

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }}
          className='relative z-10 max-w-3xl mx-auto text-center'>
          <h2 className='text-white text-[26px] md:text-[36px] font-bold'>
            Ready to Apply?
          </h2>
          <p className='text-green-200/70 text-[15px] mt-3 mb-8 leading-relaxed'>
            Our team is available to guide you through every step. Contact us via WhatsApp or submit
            your application online — approval takes less than three minutes.
          </p>
          <div className='flex flex-wrap items-center justify-center gap-4'>
            <Link to='/contact_us' onClick={() => window.scrollTo(0, 0)}
              className='inline-flex items-center gap-2 bg-[#3dba6f] hover:bg-[#2ea85f] text-white font-bold text-sm px-7 py-3.5 rounded-full transition-all duration-300 shadow-lg hover:shadow-[#3dba6f]/30 hover:scale-105'>
              Apply Now <ArrowRight size={16} />
            </Link>
            <a href='https://wa.me/2348131906385' target='_blank' rel='noreferrer'
              className='inline-flex items-center gap-2 border border-white/30 hover:border-[#3dba6f] text-white hover:text-[#3dba6f] text-sm font-semibold px-7 py-3.5 rounded-full transition-all duration-300'>
              <MessageCircle size={16} /> WhatsApp Us
            </a>
          </div>
        </motion.div>
      </section>

      {/* ── Legal Documents Tabs ── */}
      <section className='py-20 px-6 md:px-12 lg:px-20 bg-white'>
        <div className='max-w-4xl mx-auto'>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8 }} className='text-center mb-14'>
            <div className='flex items-center justify-center gap-3 mb-3'>
              <span className='h-px w-8 bg-[#3dba6f]' />
              <span className='text-[#3dba6f] text-xs font-semibold tracking-[0.2em] uppercase'>Legal & Compliance</span>
              <span className='h-px w-8 bg-[#3dba6f]' />
            </div>
            <h2 className='text-[#1a4731] text-[26px] md:text-[38px] font-bold'>Privacy Policy & Loan Terms</h2>
            <p className='text-gray-500 text-[15px] mt-3 max-w-xl mx-auto'>
              COR'N Enterprises Limited is committed to transparency. Please review our privacy and lending policies below.
            </p>
          </motion.div>

          {/* Privacy Policy */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8 }}
            className='mb-10'
          >
            <div className='flex items-center gap-3 mb-5'>
              <div className='w-10 h-10 rounded-xl bg-[#1a4731] text-[#3dba6f] flex items-center justify-center flex-shrink-0'>
                <Lock size={18} />
              </div>
              <div>
                <h3 className='text-[#1a4731] font-bold text-[18px]'>Privacy Policy</h3>
                <p className='text-gray-400 text-[12px]'>How we collect, use, and protect your personal data</p>
              </div>
            </div>
            <p className='text-gray-500 text-[14px] leading-relaxed mb-5 pl-1'>
              At COR'N Enterprises Limited, your privacy is of utmost importance. We are committed to protecting
              the information you share with us when applying for loans or interacting with our services.
            </p>
            <div className='space-y-3'>
              {privacySections.map((section, i) => (
                <AccordionItem key={i} title={section.title} content={section.content} index={i} />
              ))}
            </div>
          </motion.div>

          {/* Divider */}
          <div className='flex items-center gap-4 my-12'>
            <div className='flex-1 h-px bg-green-100' />
            <span className='text-[#3dba6f] text-xs font-semibold tracking-[0.2em] uppercase whitespace-nowrap'>Loan Terms & Conditions</span>
            <div className='flex-1 h-px bg-green-100' />
          </div>

          {/* Terms & Conditions */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8 }}
          >
            <div className='flex items-center gap-3 mb-5'>
              <div className='w-10 h-10 rounded-xl bg-[#1a4731] text-[#3dba6f] flex items-center justify-center flex-shrink-0'>
                <ScrollText size={18} />
              </div>
              <div>
                <h3 className='text-[#1a4731] font-bold text-[18px]'>Loan Terms & Conditions</h3>
                <p className='text-gray-400 text-[12px]'>By applying for a loan, you agree to the following terms</p>
              </div>
            </div>
            <p className='text-gray-500 text-[14px] leading-relaxed mb-5 pl-1'>
              These Terms & Conditions govern your use of the loan services provided by COR'N Enterprises Limited.
              By applying for a loan, you agree to the following:
            </p>
            <div className='space-y-3'>
              {termsSections.map((section, i) => (
                <AccordionItem key={i} title={section.title} content={section.content} index={i} />
              ))}
            </div>
          </motion.div>

          {/* Contact for queries */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
            className='mt-10 bg-[#f0f9f4] border border-green-100 rounded-2xl p-6'
          >
            <p className='text-[#1a4731] font-semibold text-[14px] mb-4'>
              For questions or concerns about your data or these terms, contact us at:
            </p>
            <div className='flex flex-col sm:flex-row gap-4 text-[14px]'>
              <a href='mailto:Management@cornenterprise.com'
                className='flex items-center gap-2 text-gray-600 hover:text-[#1a4731] transition-colors'>
                <Mail size={15} className='text-[#3dba6f]' />
                 Management@cornenterprise.com
              </a>
              <a href='tel:08023447314'
                className='flex items-center gap-2 text-gray-600 hover:text-[#1a4731] transition-colors'>
                <Phone size={15} className='text-[#3dba6f]' />
                08023447314
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Page