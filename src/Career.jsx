import React, { useState, useRef } from 'react'
import Nav from './Nav'
import Footer from './footer'
import { supabase } from './Authenticcation/supabaseClient'
import { motion } from 'framer-motion'
import {
  ArrowRight, TrendingUp, Heart, ShieldCheck, Zap,
  Briefcase, HeadphonesIcon, ClipboardCheck, Megaphone,
  CheckCircle, Send, Users, Star,
  Phone, Upload, FileText
} from 'lucide-react'

const whyWork = [
  {
    icon: <TrendingUp size={22} />,
    title: 'Professional Growth',
    desc: 'Work in an environment that encourages learning, career advancement, and skill development.',
  },
  {
    icon: <Heart size={22} />,
    title: 'Impactful Work',
    desc: 'Every role contributes directly to empowering individuals and businesses to achieve their financial goals.',
  },
  {
    icon: <ShieldCheck size={22} />,
    title: 'Culture of Integrity',
    desc: 'We operate with honesty, fairness, and respect in every client and team interaction.',
  },
  {
    icon: <Zap size={22} />,
    title: 'Dynamic Environment',
    desc: 'Be part of a bold, proactive team that thrives on solving challenges efficiently.',
  },
]

const opportunities = [
  {
    icon: <Briefcase size={20} />,
    role: 'Loan Officers / Relationship Managers',
    desc: 'Serve as the first point of contact for clients, assist with loan applications, and ensure compliance with lending standards.',
  },
  {
    icon: <HeadphonesIcon size={20} />,
    role: 'Customer Support Representatives',
    desc: 'Provide guidance and assistance to clients through phone, WhatsApp, and in-person channels.',
  },
  {
    icon: <ClipboardCheck size={20} />,
    role: 'Operations & Compliance Specialists',
    desc: 'Oversee verification, risk assessment, and adherence to regulatory requirements.',
  },
  {
    icon: <Megaphone size={20} />,
    role: 'Marketing & Business Development',
    desc: 'Help grow COR\'N Enterprises\' reach by creating awareness and building strong client relationships.',
  },
]

const roleDetails = [
  {
    icon: <Briefcase size={20} />,
    role: 'Loan Officers / Relationship Managers',
    responsibilities: [
      'Act as the primary point of contact for loan applicants throughout the lending process',
      'Evaluate loan applications, verify client information, and assess creditworthiness',
      'Explain loan products, terms, and repayment schedules clearly to clients',
      'Build and maintain strong client relationships to encourage repeat business',
      'Ensure all loan files are complete, accurate, and compliant with lending standards',
      'Meet monthly disbursement and repayment collection targets',
    ],
    requirements: [
      'OND / HND / B.Sc in Finance, Banking, Economics, or a related field',
      'Minimum 1 year experience in lending, banking, or financial services (entry-level considered)',
      'Strong numerical and analytical skills',
      'Excellent communication and negotiation abilities',
      'Proficiency in Microsoft Office or basic data entry tools',
      'Honest, detail-oriented, and client-focused',
    ],
  },
  {
    icon: <HeadphonesIcon size={20} />,
    role: 'Customer Support Representatives',
    responsibilities: [
      'Respond promptly to client inquiries via phone, WhatsApp, and in-person visits',
      'Resolve client complaints professionally and escalate complex issues when necessary',
      'Guide clients through loan application processes and documentation requirements',
      'Maintain accurate records of client interactions and follow-up actions',
      'Provide after-loan support to ensure client satisfaction and retention',
      'Assist in onboarding new clients and explaining company policies',
    ],
    requirements: [
      'OND / HND / B.Sc in any discipline',
      'Excellent verbal and written communication skills in English (Hausa is an added advantage)',
      'Patience, empathy, and a calm demeanour when handling difficult situations',
      'Basic computer literacy and familiarity with messaging platforms',
      'Prior customer service experience is an advantage but not mandatory',
      'Ability to multitask and work under pressure',
    ],
  },
  {
    icon: <ClipboardCheck size={20} />,
    role: 'Operations & Compliance Specialists',
    responsibilities: [
      'Oversee day-to-day operational workflows to ensure efficiency and accuracy',
      'Conduct thorough verification of client documents, guarantors, and collateral',
      'Monitor loan portfolios for risk exposure and flag delinquent accounts',
      'Ensure adherence to internal policies, regulatory guidelines, and CBN directives',
      'Prepare operational and compliance reports for management review',
      'Identify process gaps and recommend improvements to mitigate risk',
    ],
    requirements: [
      'B.Sc / HND in Finance, Accounting, Law, Business Administration, or related field',
      'Minimum 2 years experience in operations, audit, risk, or compliance roles',
      'Sound understanding of lending regulations and KYC/AML procedures',
      'High attention to detail and strong organisational skills',
      'Ability to handle sensitive information with confidentiality and integrity',
      'Proficiency in spreadsheets and report writing',
    ],
  },
  {
    icon: <Megaphone size={20} />,
    role: 'Digital Marketing & Business Development',
    responsibilities: [
      'Develop and execute marketing strategies to grow COR\'N\'s client base',
      'Identify and pursue new business opportunities within target communities',
      'Build relationships with local businesses, market associations, and cooperatives',
      'Manage social media presence and create engaging content to drive awareness',
      'Represent the company at events, trade fairs, and community outreach programmes',
      'Track campaign performance and report on lead generation and conversion metrics',
    ],
    requirements: [
      'OND / HND / B.Sc in Marketing, Business Administration, Mass Communication, or related field',
      'Proven ability to generate leads and close deals',
      'Strong interpersonal skills and community networking ability',
      'Creativity and familiarity with digital marketing tools and social media platforms',
      'Self-motivated, target-driven, and able to work with minimal supervision',
      'Knowledge of the local market in Taraba State or Abuja is a strong advantage',
    ],
  },
]

const qualities = [
  'Integrity and professionalism in all dealings',
  'Strong communication and interpersonal skills',
  'Ability to work in a fast-paced, results-driven environment',
  'Boldness in decision-making and problem-solving',
  'A commitment to helping clients achieve financial success',
]

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}


const uploadFile = async (bucket, folder, file) => {
  if (!file) return null
  const timestamp = Date.now()
  const safeName = file.name.replace(/[^a-z0-9.]/gi, '_')
  const path = `${folder}/${timestamp}_${safeName}`
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, { cacheControl: '3600', upsert: false })
  if (error) throw new Error(`File upload failed: ${error.message}`)
  const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(data.path)
  return urlData.publicUrl
}

const Career = () => {
  const [formData, setFormData] = useState({
    name: '', background: '' , message: '', role: '', email: '', phone: '', type: '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [cvFile, setCvFile] = useState(null)
  const [cvError, setCvError] = useState(null)

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!cvFile) { setCvError('Please upload your CV'); return }
    setCvError(null)
    setLoading(true)
    const { name, background, message, role, email, phone, type } = formData
    try {
      const cvUrl = await uploadFile('career-documents', 'cvs', cvFile)

      const { error } = await supabase.from('careers').insert([{ name, background, message, email, phone, type, cv_url: cvUrl }])
      if (error) throw error

      const response = await fetch('/api/send-career', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, background, message, role, phone, email, type, cv_url: cvUrl }),
      })
      const result = await response.json()
      if (response.ok) {
        setSuccess(true)
        setFormData({ name: '', message: '', role: '', phone: '', email: '', type: '' , background: '',})
        setCvFile(null)
        setTimeout(() => setSuccess(false), 6000)
      } else {
        alert(result.message || 'Error sending, please try again.')
      }
    } catch (err) {
      console.error('Error:', err)
      alert('Something went wrong. Please try again.')
    }
    setLoading(false)
  }

  return (
    <div className='bg-white min-h-screen'>
      <Nav />

      {/* ── Hero ── */}
      <section className='relative bg-[#1a4731] overflow-hidden'>
        <div className='absolute inset-0 opacity-5'
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '28px 28px' }} />
        <div className='absolute top-0 right-0 w-96 h-96 rounded-full bg-[#3dba6f]/15 blur-3xl pointer-events-none' />

        <div className='relative z-10 max-w-5xl mx-auto px-6 md:px-12 py-20 md:py-28 text-center'>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}
          >
            <div className='flex items-center justify-center gap-3 mb-4'>
              <span className='h-px w-10 bg-[#3dba6f]' />
              <span className='text-[#3dba6f] text-xs font-semibold tracking-[0.22em] uppercase'>Careers at COR'N</span>
              <span className='h-px w-10 bg-[#3dba6f]' />
            </div>
            <h1 className='text-white text-[36px] md:text-[52px] font-bold leading-tight'>
              Join a Team that Values{' '}
              <span className='text-[#3dba6f]'>Integrity,</span>{' '}
              Professionalism,{' '}
              <br className='hidden md:block' />
              and <span className='text-[#3dba6f]'>Bold Action.</span>
            </h1>
            <p className='text-green-200/70 text-[16px] md:text-[18px] mt-6 max-w-3xl mx-auto leading-relaxed'>
              At COR'N Enterprises Limited, we are more than a lending company — we are a growing community of dedicated
              professionals committed to providing fast, flexible, and trustworthy financial solutions across{' '}
              <span className='text-white font-medium'>Taraba State and Abuja</span>.
              We believe that our people are our greatest asset.
            </p>
            <a
              href='#apply'
              className='mt-8 inline-flex items-center gap-2 bg-[#3dba6f] hover:bg-[#2ea85f] text-white font-bold text-sm px-7 py-3.5 rounded-full transition-all duration-300 shadow-lg hover:shadow-[#3dba6f]/30 hover:scale-105'
            >
              Apply Now <ArrowRight size={16} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── Why Work With Us ── */}
      <section className='py-20 px-6 md:px-12 lg:px-20 bg-white'>
        <div className='max-w-6xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8 }}
            className='text-center mb-12'
          >
            <div className='flex items-center justify-center gap-3 mb-3'>
              <span className='h-px w-8 bg-[#3dba6f]' />
              <span className='text-[#3dba6f] text-xs font-semibold tracking-[0.2em] uppercase'>Our Culture</span>
              <span className='h-px w-8 bg-[#3dba6f]' />
            </div>
            <h2 className='text-[#1a4731] text-[28px] md:text-[38px] font-bold'>Why Work With Us?</h2>
          </motion.div>

          <motion.div
            variants={containerVariants} initial='hidden' whileInView='show' viewport={{ once: true }}
            className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'
          >
            {whyWork.map((item, i) => (
              <motion.div key={i} variants={cardVariants}
                className='group bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-center'
              >
                <div className='w-12 h-12 rounded-xl bg-[#f0f9f4] text-[#1a4731] flex items-center justify-center mx-auto mb-4 group-hover:bg-[#1a4731] group-hover:text-white transition-colors duration-300'>
                  {item.icon}
                </div>
                <h3 className='text-[#1a4731] font-bold text-[15px] mb-2'>{item.title}</h3>
                <p className='text-gray-500 text-[13px] leading-relaxed'>{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Current Opportunities ── */}
      <section className='py-20 px-6 md:px-12 lg:px-20 bg-[#f0f9f4]'>
        <div className='max-w-6xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8 }}
            className='text-center mb-12'
          >
            <div className='flex items-center justify-center gap-3 mb-3'>
              <span className='h-px w-8 bg-[#3dba6f]' />
              <span className='text-[#3dba6f] text-xs font-semibold tracking-[0.2em] uppercase'>Open Roles</span>
              <span className='h-px w-8 bg-[#3dba6f]' />
            </div>
            <h2 className='text-[#1a4731] text-[28px] md:text-[38px] font-bold'>Current Opportunities</h2>
            <p className='text-gray-500 text-[15px] mt-3 max-w-xl mx-auto'>
              We are always looking for talented and motivated individuals in the following areas:
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants} initial='hidden' whileInView='show' viewport={{ once: true }}
            className='grid grid-cols-1 md:grid-cols-2 gap-6'
          >
            {opportunities.map((opp, i) => (
              <motion.div key={i} variants={cardVariants}
                className='group bg-white border border-green-100 rounded-2xl p-7 shadow-sm hover:shadow-md hover:border-[#3dba6f]/40 transition-all duration-300 flex gap-5'
              >
                <div className='w-11 h-11 rounded-xl bg-[#f0f9f4] text-[#1a4731] flex items-center justify-center flex-shrink-0 group-hover:bg-[#1a4731] group-hover:text-white transition-colors duration-300'>
                  {opp.icon}
                </div>
                <div>
                  <h3 className='text-[#1a4731] font-bold text-[15px] mb-2'>{opp.role}</h3>
                  <p className='text-gray-500 text-[13px] leading-relaxed'>{opp.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Responsibilities & Requirements ── */}
      <section className='py-20 px-6 md:px-12 lg:px-20 bg-white'>
        <div className='max-w-6xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8 }}
            className='text-center mb-14'
          >
            <div className='flex items-center justify-center gap-3 mb-3'>
              <span className='h-px w-8 bg-[#3dba6f]' />
              <span className='text-[#3dba6f] text-xs font-semibold tracking-[0.2em] uppercase'>Role Details</span>
              <span className='h-px w-8 bg-[#3dba6f]' />
            </div>
            <h2 className='text-[#1a4731] text-[28px] md:text-[38px] font-bold'>Responsibilities & Requirements</h2>
            <p className='text-gray-500 text-[15px] mt-3 max-w-xl mx-auto'>
              Here's what each role entails and what we expect from successful candidates.
            </p>
          </motion.div>

          <div className='space-y-8'>
            {roleDetails.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}
                className='bg-white border border-green-100 rounded-2xl shadow-sm overflow-hidden'
              >
                {/* Role header */}
                <div className='flex items-center gap-4 bg-[#1a4731] px-8 py-5'>
                  <div className='w-10 h-10 rounded-xl bg-[#3dba6f]/20 text-[#3dba6f] flex items-center justify-center flex-shrink-0'>
                    {item.icon}
                  </div>
                  <h3 className='text-white font-bold text-[17px]'>{item.role}</h3>
                </div>

                {/* Body */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x divide-green-100'>

                  {/* Responsibilities */}
                  <div className='p-7'>
                    <h4 className='text-[#1a4731] font-bold text-[14px] uppercase tracking-widest mb-4 flex items-center gap-2'>
                      <ClipboardCheck size={15} className='text-[#3dba6f]' /> Responsibilities
                    </h4>
                    <ul className='space-y-3'>
                      {item.responsibilities.map((r, j) => (
                        <li key={j} className='flex items-start gap-2.5 text-[13.5px] text-gray-600 leading-relaxed'>
                          <span className='w-1.5 h-1.5 rounded-full bg-[#3dba6f] flex-shrink-0 mt-2' />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Requirements */}
                  <div className='p-7 bg-[#f9fefb]'>
                    <h4 className='text-[#1a4731] font-bold text-[14px] uppercase tracking-widest mb-4 flex items-center gap-2'>
                      <CheckCircle size={15} className='text-[#3dba6f]' /> Requirements
                    </h4>
                    <ul className='space-y-3'>
                      {item.requirements.map((r, j) => (
                        <li key={j} className='flex items-start gap-2.5 text-[13.5px] text-gray-600 leading-relaxed'>
                          <CheckCircle size={14} className='text-[#3dba6f] flex-shrink-0 mt-0.5' />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Who We're Looking For ── */}
      <section className='py-20 px-6 md:px-12 lg:px-20 bg-white'>
        <div className='max-w-4xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8 }}
            className='text-center mb-12'
          >
            <div className='flex items-center justify-center gap-3 mb-3'>
              <span className='h-px w-8 bg-[#3dba6f]' />
              <span className='text-[#3dba6f] text-xs font-semibold tracking-[0.2em] uppercase'>Ideal Candidates</span>
              <span className='h-px w-8 bg-[#3dba6f]' />
            </div>
            <h2 className='text-[#1a4731] text-[28px] md:text-[38px] font-bold'>Who We Are Looking For</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8 }}
            className='bg-[#f0f9f4] border border-green-100 rounded-2xl p-8 md:p-10'
          >
            <ul className='space-y-4'>
              {qualities.map((q, i) => (
                <li key={i} className='flex items-start gap-3 text-[15px] text-gray-700'>
                  <CheckCircle size={18} className='text-[#3dba6f] flex-shrink-0 mt-0.5' />
                  {q}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* ── How to Apply + Form ── */}
      <section id='apply' className='py-20 px-6 md:px-12 lg:px-20 bg-[#f0f9f4]'>
        <div className='max-w-6xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8 }}
            className='text-center mb-14'
          >
            <div className='flex items-center justify-center gap-3 mb-3'>
              <span className='h-px w-8 bg-[#3dba6f]' />
              <span className='text-[#3dba6f] text-xs font-semibold tracking-[0.2em] uppercase'>How to Apply</span>
              <span className='h-px w-8 bg-[#3dba6f]' />
            </div>
            <h2 className='text-[#1a4731] text-[28px] md:text-[38px] font-bold'>Ready to Make a Difference?</h2>
            <p className='text-gray-500 text-[15px] mt-3 max-w-2xl mx-auto leading-relaxed'>
              Submit your application by sending your CV and cover letter to{' '}
              <a href='mailto:Careers@cornenterprise.com' className='text-[#1a4731] font-semibold underline underline-offset-2 hover:text-[#3dba6f] transition-colors'>
                Careers@cornenterprise.com
              </a>
              {' '}with the position you are applying for in the subject line.
              All qualified candidates will be reviewed and contacted for an interview.
            </p>
          </motion.div>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-start'>

            {/* Info panel */}
            <motion.div
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.8 }}
            >
              <div className='bg-[#1a4731] rounded-2xl p-8 text-white h-full'>
                <div className='flex items-center gap-3 mb-6'>
                  <div className='w-10 h-10 rounded-xl bg-[#3dba6f]/20 flex items-center justify-center'>
                    <Users size={20} className='text-[#3dba6f]' />
                  </div>
                  <h3 className='font-bold text-[18px]'>Join Our Growing Team</h3>
                </div>
                <p className='text-green-200/70 text-[14px] leading-relaxed mb-8'>
                  At COR'N Enterprises Limited, we value diversity, fairness, and opportunity for growth.
                  Whether you want to work, train, or build a long-term career — this is the place for you.
                </p>

                <div className='space-y-4'>
                  {[
                    { icon: <Star size={16} />, text: 'Competitive and fair compensation' },
                    { icon: <TrendingUp size={16} />, text: 'Clear career advancement paths' },
                    { icon: <ShieldCheck size={16} />, text: 'Integrity-driven work culture' },
                    { icon: <Zap size={16} />, text: 'Fast-paced, impactful environment' },
                  ].map((pt, i) => (
                    <div key={i} className='flex items-center gap-3 text-[13px] text-green-200/80'>
                      <span className='text-[#3dba6f]'>{pt.icon}</span>
                      {pt.text}
                    </div>
                  ))}
                </div>

                <div className='mt-10 pt-6 border-t border-white/10'>
                  <p className='text-[#3dba6f] font-bold text-[16px]'>Grow Your Career.</p>
                  <p className='text-white font-bold text-[16px]'>Make a Difference.</p>
                  <p className='text-green-200/60 text-[13px] mt-1'>Join COR'N Enterprises Limited Today.</p>
                </div>
              </div>
            </motion.div>

            {/* Application Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.8 }}
            >
              <div className='bg-white border border-green-100 rounded-2xl p-8 shadow-sm'>
                <h3 className='text-[#1a4731] font-bold text-[20px] mb-6 flex items-center gap-2'>
                  <Send size={18} className='text-[#3dba6f]' />
                  Submit Your Application
                </h3>

                {success && (
                  <div className='mb-6 flex items-center gap-2 bg-[#f0f9f4] border border-[#3dba6f]/40 text-[#1a4731] px-5 py-3 rounded-xl text-[14px] font-semibold'>
                    <CheckCircle size={18} className='text-[#3dba6f]' />
                    Application submitted! We'll be in touch soon.
                  </div>
                )}

                <form onSubmit={handleSubmit} className='space-y-4'>
                  {/* Full Name */}
                  <div>
                    <label className='block text-[#1a4731] text-[13px] font-semibold mb-1.5'>Full Name</label>
                    <input
                      type='text' name='name' value={formData.name} onChange={handleChange} required
                      placeholder='Enter your full name'
                      className='w-full border border-gray-200 focus:border-[#3dba6f] focus:ring-2 focus:ring-[#3dba6f]/20 rounded-xl px-4 py-3 text-[14px] text-gray-700 outline-none transition-all duration-200'
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className='block text-[#1a4731] text-[13px] font-semibold mb-1.5'>Email Address</label>
                    <input
                      type='email' name='email' value={formData.email} onChange={handleChange} required
                      placeholder='Enter your email'
                      className='w-full border border-gray-200 focus:border-[#3dba6f] focus:ring-2 focus:ring-[#3dba6f]/20 rounded-xl px-4 py-3 text-[14px] text-gray-700 outline-none transition-all duration-200'
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className='block text-[#1a4731] text-[13px] font-semibold mb-1.5'>Phone Number</label>
                    <input
                      type='tel' name='phone' value={formData.phone} onChange={handleChange} required
                      placeholder='Enter your phone number'
                      className='w-full border border-gray-200 focus:border-[#3dba6f] focus:ring-2 focus:ring-[#3dba6f]/20 rounded-xl px-4 py-3 text-[14px] text-gray-700 outline-none transition-all duration-200'
                    />
                  </div>

                  {/* Position */}
                  <div>
                    <label className='block text-[#1a4731] text-[13px] font-semibold mb-1.5'>Position Applying For</label>
                    <select
                      name='type' value={formData.type} onChange={handleChange} required
                      className='w-full border border-gray-200 focus:border-[#3dba6f] focus:ring-2 focus:ring-[#3dba6f]/20 rounded-xl px-4 py-3 text-[14px] text-gray-700 outline-none transition-all duration-200 bg-white'
                    >
                      <option value=''>Select a position</option>
                      <option value='Loan Officers / Relationship Managers'>Loan Officers / Relationship Managers</option>
                      <option value='Customer Support Representatives'>Customer Support Representatives</option>
                      <option value='Operations & Compliance Specialists'>Operations & Compliance Specialists</option>
                      <option value='Digital Marketing & Business Development'>Digital Marketing & Business Development</option>
                    </select>
                  </div>

                  {/* Career Path */}
                  <div>
                    <label className='block text-[#1a4731] text-[13px] font-semibold mb-1.5'>Your Professional Background</label>
                    <input
                      type='text' name='background' value={formData.background} onChange={handleChange} required
                      placeholder='e.g. Banking, Finance, Marketing...'
                      className='w-full border border-gray-200 focus:border-[#3dba6f] focus:ring-2 focus:ring-[#3dba6f]/20 rounded-xl px-4 py-3 text-[14px] text-gray-700 outline-none transition-all duration-200'
                    />
                  </div>

                  {/* Why join */}
                  <div>
                    <label className='block text-[#1a4731] text-[13px] font-semibold mb-1.5'>Why Do You Want to Join Us?</label>
                    <textarea
                      name='message' value={formData.message} onChange={handleChange} required rows={4}
                      className='w-full border border-gray-200 focus:border-[#3dba6f] focus:ring-2 focus:ring-[#3dba6f]/20 rounded-xl px-4 py-3 text-[14px] text-gray-700 outline-none transition-all duration-200 resize-none'
                    />
                  </div>

                  {/* CV Upload */}
                  <div>
                    <label className='block text-[#1a4731] text-[13px] font-semibold mb-1.5'>
                      Upload CV / Resume <span className='text-red-500'>*</span>
                    </label>
                    <label className={`flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-xl px-4 py-5 cursor-pointer transition-all duration-200 text-center
                      ${cvFile ? 'border-[#3dba6f] bg-[#f0f9f4]' : cvError ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-[#3dba6f]/50 hover:bg-[#f0f9f4]/50'}`}>
                      {cvFile ? (
                        <>
                          <CheckCircle size={22} className='text-[#3dba6f]' />
                          <span className='text-[#1a4731] text-[13px] font-medium'>{cvFile.name}</span>
                          <span className='text-gray-400 text-[11px]'>Click to change file</span>
                        </>
                      ) : (
                        <>
                          <Upload size={22} className={cvError ? 'text-red-400' : 'text-gray-400'} />
                          <span className={`text-[13px] font-medium ${cvError ? 'text-red-400' : 'text-gray-500'}`}>Click to upload your CV</span>
                          <span className='text-gray-300 text-[11px]'>PDF, DOC or DOCX — max 5MB</span>
                        </>
                      )}
                      <input
                        type='file'
                        accept='.pdf,.doc,.docx'
                        onChange={e => { const f = e.target.files[0]; if (f) { setCvFile(f); setCvError(null) } }}
                        className='hidden'
                      />
                    </label>
                    {cvError && (
                      <p className='text-red-500 text-[11px] mt-1 flex items-center gap-1'>
                        <FileText size={11} />{cvError}
                      </p>
                    )}
                  </div>

                  <button
                    type='submit' disabled={loading}
                    className='w-full bg-[#1a4731] hover:bg-[#2d7a4f] disabled:opacity-60 text-white font-bold text-[14px] py-3.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.01]'
                  >
                    {loading ? 'Submitting...' : (
                      <><Send size={16} /> Submit Application</>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Career