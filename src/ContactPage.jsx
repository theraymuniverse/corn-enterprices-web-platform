import React, { useState } from 'react'
import Nav from './Nav'
import Footer from './footer'
import { supabase } from './Authenticcation/supabaseClient'
import { motion } from 'framer-motion'
import {
  User, Briefcase, DollarSign, Shield, Upload, CheckCircle,
  AlertCircle, ArrowRight, FileText, MessageCircle
} from 'lucide-react'

const nigeriaStates = [
  'Abuja (FCT)', 'Taraba', 'Adamawa', 'Borno', 'Yobe', 'Gombe',
  'Bauchi', 'Plateau', 'Nasarawa', 'Kogi', 'Benue', 'Cross River',
  'Akwa Ibom', 'Rivers', 'Bayelsa', 'Delta', 'Edo', 'Anambra',
  'Enugu', 'Ebonyi', 'Imo', 'Abia', 'Lagos', 'Ogun', 'Oyo',
  'Osun', 'Ondo', 'Ekiti', 'Kwara', 'Niger', 'Kebbi', 'Sokoto',
  'Zamfara', 'Katsina', 'Kano', 'Jigawa', 'Kaduna',
]

const steps = [
  { num: '01', label: 'Personal Info' },
  { num: '02', label: 'Employment' },
  { num: '03', label: 'Loan Details' },
  { num: '04', label: 'Guarantor' },
  { num: '05', label: 'Documents' },
  { num: '06', label: 'Declaration' },
]

// Dynamically adds red border when the field has an error
const fieldClass = (err) =>
  `w-full border ${err ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20 bg-red-50' : 'border-gray-200 focus:border-[#3dba6f] focus:ring-[#3dba6f]/20 bg-white'} focus:ring-2 rounded-xl px-4 py-3 text-[14px] text-gray-700 outline-none transition-all duration-200`

const labelClass = 'block text-[#1a4731] text-[13px] font-semibold mb-1.5'
const sectionHeadClass = 'flex items-center gap-3 mb-6 pb-3 border-b border-green-100'

// Inline error message
const ErrMsg = ({ msg }) => msg
  ? <p className='text-red-500 text-[11px] mt-1 flex items-center gap-1'><AlertCircle size={11} />{msg}</p>
  : null

// Red asterisk for required labels
const Req = () => <span className='text-red-500 ml-0.5'>*</span>

// Upload a file to Supabase Storage, return public URL
const uploadFile = async (bucket, folder, file) => {
  if (!file) return null
  const timestamp = Date.now()
  const safeName = file.name.replace(/[^a-z0-9.]/gi, '_')
  const path = `${folder}/${timestamp}_${safeName}`
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, { cacheControl: '3600', upsert: false })
  if (error) throw new Error(`File upload failed (${folder}): ${error.message}`)
  const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(data.path)
  return urlData.publicUrl
}

const ContactPage = () => {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errors, setErrors] = useState({})
  const [declarations, setDeclarations] = useState({ confirm: false, understand: false })
  const [idFile, setIdFile] = useState(null)
  const [slipFile, setSlipFile] = useState(null)

  const [formData, setFormData] = useState({
    fullName: '', phone: '', email: '', address: '', cityState: '',
    employmentStatus: '', employerName: '', workAddress: '', monthlyIncome: '', yearsAtJob: '',
    loanType: '', loanAmount: '', loanPurpose: '', repaymentDuration: '',
    guarantorName: '', guarantorPhone: '', guarantorRelationship: '', guarantorOccupation: '', bvn: '', guarantorID: '',
  })

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    if (errors[e.target.name]) setErrors(prev => ({ ...prev, [e.target.name]: null }))
  }

  const handleFileChange = (e, type) => {
    const file = e.target.files[0]
    if (!file) return
    if (type === 'id') { setIdFile(file); setErrors(prev => ({ ...prev, idFile: null })) }
    else { setSlipFile(file); setErrors(prev => ({ ...prev, slipFile: null })) }
  }

  const validate = () => {
    const required = [
      'fullName', 'phone', 'email', 'address', 'cityState', 'bvn',
      'employmentStatus', 'employerName', 'workAddress', 'monthlyIncome', 'yearsAtJob',
      'loanType', 'loanAmount', 'loanPurpose', 'repaymentDuration',
      'guarantorName', 'guarantorPhone', 'guarantorRelationship', 'guarantorOccupation', 'guarantorID',
    ]
    const newErrors = {}
    required.forEach(k => { if (!formData[k]) newErrors[k] = 'This field is required' })
    if (!idFile) newErrors.idFile = 'Please upload your Work ID Card'
    if (!slipFile) newErrors.slipFile = 'Please upload your Salary Slip / Proof of Income'
    if (!declarations.confirm || !declarations.understand) newErrors.declaration = 'Please accept both declarations'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) {
      setTimeout(() => {
        const el = document.querySelector('.text-red-500')
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }, 50)
      return
    }
    setLoading(true)
    try {
      const [idFileUrl, slipFileUrl] = await Promise.all([
        uploadFile('loan-documents', 'work-ids', idFile),
        uploadFile('loan-documents', 'salary-slips', slipFile),
      ])
      const { error } = await supabase.from('loan_applications').insert([{
        ...formData,
        declaration_confirm: declarations.confirm,
        declaration_understand: declarations.understand,
        id_card_url: idFileUrl,
        salary_slip_url: slipFileUrl,
      }])
      if (error) throw error
      await fetch('/api/send-loan-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, work_id_url: idFileUrl, salary_slip_url: slipFileUrl }),
      })
      setSuccess(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      console.error(err)
      alert(`Something went wrong: ${err.message ?? 'Please try again.'}`)
    }
    setLoading(false)
  }

  if (success) {
    return (
      <div className='bg-white min-h-screen'>
        <Nav />
        <div className='flex flex-col items-center justify-center py-32 px-6 text-center'>
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6 }}>
            <div className='w-20 h-20 rounded-full bg-[#f0f9f4] border-2 border-[#3dba6f] flex items-center justify-center mx-auto mb-6'>
              <CheckCircle size={40} className='text-[#3dba6f]' />
            </div>
            <h2 className='text-[#1a4731] text-[28px] md:text-[36px] font-bold mb-3'>Application Submitted!</h2>
            <p className='text-gray-500 text-[15px] max-w-md mx-auto leading-relaxed mb-8'>
              Thank you for applying. Our team will review your application and may contact you shortly.
              Qualified applicants may receive loan approval within minutes.
            </p>
            <div className='flex flex-wrap items-center justify-center gap-4'>
              <a href='/' className='inline-flex items-center gap-2 bg-[#1a4731] hover:bg-[#2d7a4f] text-white font-bold text-sm px-7 py-3.5 rounded-full transition-all duration-300'>
                Back to Home <ArrowRight size={16} />
              </a>
              <a href='https://wa.me/2348131906385' target='_blank' rel='noreferrer'
                className='inline-flex items-center gap-2 border border-green-200 text-[#1a4731] hover:border-[#3dba6f] text-sm font-semibold px-7 py-3.5 rounded-full transition-all duration-300'>
                <MessageCircle size={16} /> WhatsApp Us
              </a>
            </div>
          </motion.div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className='bg-white min-h-screen'>
      <Nav />

      {/* ── Hero ── */}
      <section className='relative bg-[#1a4731] overflow-hidden'>
        <div className='absolute inset-0 opacity-5'
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '28px 28px' }} />
        <div className='absolute top-0 right-0 w-96 h-96 rounded-full bg-[#3dba6f]/15 blur-3xl pointer-events-none' />
        <div className='relative z-10 max-w-4xl mx-auto px-6 md:px-12 py-16 md:py-24 text-center'>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className='flex items-center justify-center gap-3 mb-4'>
              <span className='h-px w-10 bg-[#3dba6f]' />
              <span className='text-[#3dba6f] text-xs font-semibold tracking-[0.22em] uppercase'>Loan Application</span>
              <span className='h-px w-10 bg-[#3dba6f]' />
            </div>
            <h1 className='text-white text-[30px] md:text-[48px] font-bold leading-tight'>
              Apply for a Loan <span className='text-[#3dba6f]'>in Minutes</span>
            </h1>
            <p className='text-green-200/70 text-[15px] md:text-[17px] mt-4 max-w-2xl mx-auto leading-relaxed'>
              Complete the form below to begin your loan application.{' '}
              <span className='text-white font-medium'>All information provided will be treated with strict confidentiality.</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Step indicators ── */}
      <div className='bg-[#f0f9f4] border-b border-green-100 overflow-x-auto'>
        <div className='max-w-4xl mx-auto px-6 py-4 flex items-center gap-2 min-w-max md:min-w-0 md:justify-center'>
          {steps.map((s, i) => (
            <React.Fragment key={i}>
              <div className='flex items-center gap-1.5 flex-shrink-0'>
                <span className='w-6 h-6 rounded-full bg-[#1a4731] text-white text-[10px] font-bold flex items-center justify-center'>{s.num}</span>
                <span className='text-[#1a4731] text-[12px] font-medium hidden sm:block'>{s.label}</span>
              </div>
              {i < steps.length - 1 && <span className='w-6 h-px bg-green-200 flex-shrink-0' />}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ── Form ── */}
      <section className='py-16 px-6 md:px-12 lg:px-20 bg-white'>
        <div className='max-w-3xl mx-auto'>
          <p className='text-gray-400 text-[12px] mb-6'>Fields marked <span className='text-red-500'>*</span> are required.</p>
          <form onSubmit={handleSubmit} className='space-y-10'>

            {/* ── 1. Personal Information ── */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7 }}
              className='bg-white border border-gray-100 rounded-2xl p-7 shadow-sm'>
              <div className={sectionHeadClass}>
                <div className='w-9 h-9 rounded-xl bg-[#1a4731] text-[#3dba6f] flex items-center justify-center flex-shrink-0'>
                  <User size={17} />
                </div>
                <div>
                  <h3 className='text-[#1a4731] font-bold text-[16px]'>Personal Information</h3>
                  <p className='text-gray-400 text-[12px]'>Your basic personal details</p>
                </div>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                <div className='md:col-span-2'>
                  <label className={labelClass}>Full Name <Req /></label>
                  <input type='text' name='fullName' value={formData.fullName} onChange={handleChange}
                    placeholder='Enter your full name' className={fieldClass(errors.fullName)} />
                  <ErrMsg msg={errors.fullName} />
                </div>
                <div>
                  <label className={labelClass}>Phone Number <Req /></label>
                  <input type='tel' name='phone' value={formData.phone} onChange={handleChange}
                    placeholder='e.g. 08012345678' className={fieldClass(errors.phone)} />
                  <ErrMsg msg={errors.phone} />
                </div>
                <div>
                  <label className={labelClass}>Email Address <Req /></label>
                  <input type='email' name='email' value={formData.email} onChange={handleChange}
                    placeholder='your@email.com' className={fieldClass(errors.email)} />
                  <ErrMsg msg={errors.email} />
                </div>
                <div className='md:col-span-2'>
                  <label className={labelClass}>BVN <Req /></label>
                  <input type='tel' name='bvn' maxLength={11} value={formData.bvn} onChange={handleChange}
                    placeholder='Enter your BVN' className={fieldClass(errors.bvn)} />
                  <ErrMsg msg={errors.bvn} />
                </div>
                <div className='md:col-span-2'>
                  <label className={labelClass}>Residential Address <Req /></label>
                  <input type='text' name='address' value={formData.address} onChange={handleChange}
                    placeholder='Enter your home address' className={fieldClass(errors.address)} />
                  <ErrMsg msg={errors.address} />
                </div>
                <div>
                  <label className={labelClass}>City / State <Req /></label>
                  <select name='cityState' value={formData.cityState} onChange={handleChange} className={fieldClass(errors.cityState)}>
                    <option value=''>Select your state</option>
                    {nigeriaStates.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <ErrMsg msg={errors.cityState} />
                </div>
              </div>
            </motion.div>

            {/* ── 2. Employment Information ── */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7 }}
              className='bg-white border border-gray-100 rounded-2xl p-7 shadow-sm'>
              <div className={sectionHeadClass}>
                <div className='w-9 h-9 rounded-xl bg-[#1a4731] text-[#3dba6f] flex items-center justify-center flex-shrink-0'>
                  <Briefcase size={17} />
                </div>
                <div>
                  <h3 className='text-[#1a4731] font-bold text-[16px]'>Employment Information</h3>
                  <p className='text-gray-400 text-[12px]'>Details about your current employment or business</p>
                </div>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                <div className='md:col-span-2'>
                  <label className={labelClass}>Employment Status <Req /></label>
                  <div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
                    {['Salary Earner', 'Civil Servant', 'Business Owner', 'SME Operator'].map(opt => (
                      <label key={opt} className={`flex items-center gap-2 border rounded-xl px-4 py-3 cursor-pointer transition-all duration-200 text-[13px]
                        ${formData.employmentStatus === opt
                          ? 'border-[#3dba6f] bg-[#f0f9f4] text-[#1a4731] font-semibold'
                          : errors.employmentStatus
                            ? 'border-red-300 bg-red-50 text-gray-600'
                            : 'border-gray-200 text-gray-600 hover:border-green-200'}`}>
                        <input type='radio' name='employmentStatus' value={opt}
                          checked={formData.employmentStatus === opt}
                          onChange={handleChange} className='accent-[#3dba6f]' />
                        {opt}
                      </label>
                    ))}
                  </div>
                  <ErrMsg msg={errors.employmentStatus} />
                </div>
                <div>
                  <label className={labelClass}>Name of Employer / Business <Req /></label>
                  <input type='text' name='employerName' value={formData.employerName} onChange={handleChange}
                    placeholder='Employer or business name' className={fieldClass(errors.employerName)} />
                  <ErrMsg msg={errors.employerName} />
                </div>
                <div>
                  <label className={labelClass}>Work Address <Req /></label>
                  <input type='text' name='workAddress' value={formData.workAddress} onChange={handleChange}
                    placeholder='Office or business address' className={fieldClass(errors.workAddress)} />
                  <ErrMsg msg={errors.workAddress} />
                </div>
                <div>
                  <label className={labelClass}>Monthly Income (₦) <Req /></label>
                  <input type='text' name='monthlyIncome' value={formData.monthlyIncome} onChange={handleChange}
                    placeholder='e.g. 80,000' className={fieldClass(errors.monthlyIncome)} />
                  <ErrMsg msg={errors.monthlyIncome} />
                </div>
                <div>
                  <label className={labelClass}>Years at Current Job / Business <Req /></label>
                  <select name='yearsAtJob' value={formData.yearsAtJob} onChange={handleChange} className={fieldClass(errors.yearsAtJob)}>
                    <option value=''>Select duration</option>
                    <option value='Less than 1 year'>Less than 1 year</option>
                    <option value='1–3 years'>1–3 years</option>
                    <option value='3–5 years'>3–5 years</option>
                    <option value='Over 5 years'>Over 5 years</option>
                  </select>
                  <ErrMsg msg={errors.yearsAtJob} />
                </div>
              </div>
            </motion.div>

            {/* ── 3. Loan Details ── */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7 }}
              className='bg-white border border-gray-100 rounded-2xl p-7 shadow-sm'>
              <div className={sectionHeadClass}>
                <div className='w-9 h-9 rounded-xl bg-[#1a4731] text-[#3dba6f] flex items-center justify-center flex-shrink-0'>
                  <DollarSign size={17} />
                </div>
                <div>
                  <h3 className='text-[#1a4731] font-bold text-[16px]'>Loan Details</h3>
                  <p className='text-gray-400 text-[12px]'>Specify the type and amount of loan required</p>
                </div>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                <div className='md:col-span-2'>
                  <label className={labelClass}>Type of Loan Required <Req /></label>
                  <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
                    {['Personal Soft Loan', 'Salary Advance', 'SME Business Loan'].map(opt => (
                      <label key={opt} className={`flex items-center gap-2 border rounded-xl px-4 py-3 cursor-pointer transition-all duration-200 text-[13px]
                        ${formData.loanType === opt
                          ? 'border-[#3dba6f] bg-[#f0f9f4] text-[#1a4731] font-semibold'
                          : errors.loanType
                            ? 'border-red-300 bg-red-50 text-gray-600'
                            : 'border-gray-200 text-gray-600 hover:border-green-200'}`}>
                        <input type='radio' name='loanType' value={opt}
                          checked={formData.loanType === opt}
                          onChange={handleChange} className='accent-[#3dba6f]' />
                        {opt}
                      </label>
                    ))}
                  </div>
                  <ErrMsg msg={errors.loanType} />
                </div>
                <div>
                  <label className={labelClass}>Loan Amount Needed <Req /></label>
                  <input type='text' name='loanAmount' value={formData.loanAmount} onChange={handleChange}
                    placeholder='What amount of loan do you need' className={fieldClass(errors.loanAmount)} />
                  <ErrMsg msg={errors.loanAmount} />
                </div>
                <div>
                  <label className={labelClass}>Preferred Repayment Duration <Req /></label>
                  <select name='repaymentDuration' value={formData.repaymentDuration} onChange={handleChange} className={fieldClass(errors.repaymentDuration)}>
                    <option value=''>Select duration</option>
                    {['1 Month', '2 Months', '3 Months', '4 Months', '5 Months'].map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                  <ErrMsg msg={errors.repaymentDuration} />
                </div>
                <div className='md:col-span-2'>
                  <label className={labelClass}>Purpose of Loan <Req /></label>
                  <input type='text' name='loanPurpose' value={formData.loanPurpose} onChange={handleChange}
                    placeholder='Briefly describe why you need this loan' className={fieldClass(errors.loanPurpose)} />
                  <ErrMsg msg={errors.loanPurpose} />
                </div>
              </div>
            </motion.div>

            {/* ── 4. Guarantor Information ── */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7 }}
              className='bg-white border border-gray-100 rounded-2xl p-7 shadow-sm'>
              <div className={sectionHeadClass}>
                <div className='w-9 h-9 rounded-xl bg-[#1a4731] text-[#3dba6f] flex items-center justify-center flex-shrink-0'>
                  <Shield size={17} />
                </div>
                <div>
                  <h3 className='text-[#1a4731] font-bold text-[16px]'>Guarantor Information</h3>
                  <p className='text-gray-400 text-[12px]'>A guarantor is required for all loan applications</p>
                </div>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                <div>
                  <label className={labelClass}>Guarantor Full Name <Req /></label>
                  <input type='text' name='guarantorName' value={formData.guarantorName} onChange={handleChange}
                    placeholder="Guarantor's full name" className={fieldClass(errors.guarantorName)} />
                  <ErrMsg msg={errors.guarantorName} />
                </div>
                <div>
                  <label className={labelClass}>Guarantor Phone Number <Req /></label>
                  <input type='tel' name='guarantorPhone' value={formData.guarantorPhone} onChange={handleChange}
                    placeholder="Guarantor's phone" className={fieldClass(errors.guarantorPhone)} />
                  <ErrMsg msg={errors.guarantorPhone} />
                </div>
                <div>
                  <label className={labelClass}>Guarantor's Unique ID <Req /></label>
                  <input type='text' name='guarantorID' value={formData.guarantorID} onChange={handleChange}
                    placeholder='Enter ID here' className={fieldClass(errors.guarantorID)} />
                  <ErrMsg msg={errors.guarantorID} />
                </div>
                <div>
                  <label className={labelClass}>Relationship to Applicant <Req /></label>
                  <input type='text' name='guarantorRelationship' value={formData.guarantorRelationship} onChange={handleChange}
                    placeholder='e.g. Colleague, Friend, Relative' className={fieldClass(errors.guarantorRelationship)} />
                  <ErrMsg msg={errors.guarantorRelationship} />
                </div>
                <div>
                  <label className={labelClass}>Guarantor Occupation <Req /></label>
                  <input type='text' name='guarantorOccupation' value={formData.guarantorOccupation} onChange={handleChange}
                    placeholder="Guarantor's occupation" className={fieldClass(errors.guarantorOccupation)} />
                  <ErrMsg msg={errors.guarantorOccupation} />
                </div>
              </div>
            </motion.div>

            {/* ── 5. Document Upload ── */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7 }}
              className='bg-white border border-gray-100 rounded-2xl p-7 shadow-sm'>
              <div className={sectionHeadClass}>
                <div className='w-9 h-9 rounded-xl bg-[#1a4731] text-[#3dba6f] flex items-center justify-center flex-shrink-0'>
                  <Upload size={17} />
                </div>
                <div>
                  <h3 className='text-[#1a4731] font-bold text-[16px]'>Document Upload</h3>
                  <p className='text-gray-400 text-[12px]'>Please upload the following supporting documents</p>
                </div>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                {[
                  { label: 'Work ID Card', key: 'id', state: idFile, hint: 'JPG, PNG or PDF — max 5MB', errorKey: 'idFile' },
                  { label: 'Salary Slip / Proof of Income', key: 'slip', state: slipFile, hint: 'JPG, PNG or PDF — max 5MB', errorKey: 'slipFile' },
                ].map(({ label, key, state, hint, errorKey }) => (
                  <div key={key}>
                    <label className={labelClass}>{label} <Req /></label>
                    <label className={`flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-xl px-4 py-6 cursor-pointer transition-all duration-200 text-center
                      ${state ? 'border-[#3dba6f] bg-[#f0f9f4]' : errors[errorKey] ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-[#3dba6f]/50 hover:bg-[#f0f9f4]/50'}`}>
                      {state
                        ? <><CheckCircle size={22} className='text-[#3dba6f]' /><span className='text-[#1a4731] text-[13px] font-medium'>{state.name}</span></>
                        : <>
                            <Upload size={22} className={errors[errorKey] ? 'text-red-400' : 'text-gray-400'} />
                            <span className={`text-[13px] ${errors[errorKey] ? 'text-red-400' : 'text-gray-400'}`}>Click to upload</span>
                            <span className='text-gray-300 text-[11px]'>{hint}</span>
                          </>
                      }
                      <input type='file' accept='.jpg,.jpeg,.png,.pdf' onChange={(e) => handleFileChange(e, key)} className='hidden' />
                    </label>
                    <ErrMsg msg={errors[errorKey]} />
                  </div>
                ))}
              </div>
            </motion.div>

            {/* ── 6. Declaration ── */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7 }}
              className={`border rounded-2xl p-7 transition-colors duration-200 ${errors.declaration ? 'bg-red-50 border-red-200' : 'bg-[#f0f9f4] border-green-100'}`}>
              <div className={sectionHeadClass}>
                <div className='w-9 h-9 rounded-xl bg-[#1a4731] text-[#3dba6f] flex items-center justify-center flex-shrink-0'>
                  <FileText size={17} />
                </div>
                <div>
                  <h3 className='text-[#1a4731] font-bold text-[16px]'>Declaration <Req /></h3>
                  <p className='text-gray-400 text-[12px]'>Please read and confirm the statements below</p>
                </div>
              </div>

              <div className='space-y-4'>
                {[
                  { key: 'confirm', text: 'I confirm that all information provided in this application is true and accurate.' },
                  { key: 'understand', text: "I understand that COR'N Enterprises Limited may verify the information submitted for loan assessment purposes." },
                ].map(({ key, text }) => (
                  <label key={key} className={`flex items-start gap-3 cursor-pointer p-4 rounded-xl border transition-all duration-200
                    ${declarations[key]
                      ? 'border-[#3dba6f]/50 bg-white'
                      : errors.declaration
                        ? 'border-red-300 bg-white/80 hover:bg-white'
                        : 'border-transparent bg-white/60 hover:bg-white'}`}>
                    <div className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5 border-2 transition-colors duration-200
                      ${declarations[key] ? 'bg-[#1a4731] border-[#1a4731]' : errors.declaration ? 'border-red-400' : 'border-gray-300'}`}>
                      {declarations[key] && <CheckCircle size={13} className='text-white' />}
                    </div>
                    <input type='checkbox' checked={declarations[key]}
                      onChange={() => {
                        setDeclarations(prev => ({ ...prev, [key]: !prev[key] }))
                        setErrors(prev => ({ ...prev, declaration: null }))
                      }}
                      className='hidden' />
                    <span className='text-gray-600 text-[13px] leading-relaxed'>{text}</span>
                  </label>
                ))}
                <ErrMsg msg={errors.declaration} />
              </div>
            </motion.div>

            {/* ── Submit ── */}
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}
              className='text-center'>
              <button type='submit' disabled={loading}
                className='w-full md:w-auto inline-flex items-center justify-center gap-3 bg-[#1a4731] hover:bg-[#2d7a4f] disabled:opacity-60 text-white font-bold text-[15px] px-12 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-green-800/25 hover:scale-105'>
                {loading
                  ? <><span className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin' />Processing...</>
                  : <><ArrowRight size={18} />Apply for Loan</>
                }
              </button>
              <p className='text-gray-400 text-[12px] mt-4'>
                After submission, our team will review your application and may contact you shortly.{' '}
                <span className='text-[#1a4731] font-medium'>Qualified applicants may receive approval within minutes.</span>
              </p>
            </motion.div>

          </form>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default ContactPage