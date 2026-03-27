import { useState } from "react";
import Nav from './Nav'
import { supabase } from './Authenticcation/supabaseClient'
import Footer from "./footer"
import icon2 from './assets/az.jpg'
import { motion } from "framer-motion";
import { Flag, Eye, MapPin, Phone, Mail, Send, CheckCircle, ArrowRight, Users, TrendingUp, Globe, Handshake } from 'lucide-react';
import rose from './assets/open.jpg'
import store from './assets/store.jpg'
import truck from './assets/trucker.jpg'

const whyPartner = [
  {
    icon: <MapPin size={22} />,
    title: 'Strategic Location',
    desc: 'Based in Jalingo, Taraba State — with fertile lands, favorable climate, and vast potential to grow lending operations at scale.',
  },
  {
    icon: <TrendingUp size={22} />,
    title: 'Fast-Rising Brand',
    desc: 'A strong and growing brand presence, backed by trusted collaborators, expanding across local and regional markets.',
  },
  {
    icon: <Handshake size={22} />,
    title: 'Diverse Partnership Avenues',
    desc: 'We welcome Equity Investors, Financial Collaborators, Distribution Partners, Franchisees, and Strategic Advisors.',
  },
  {
    icon: <Globe size={22} />,
    title: 'Impact-Driven & Scalable',
    desc: 'Beyond returns, we create jobs, empower communities, and promote financial inclusion across Taraba State and Abuja.',
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const PartnerPage = () => {
  const [role, setRole] = useState("");
  const [formData, setFormData] = useState({
    firstname: "", surname: "", email: "", phone: "",
    businessName: "", website: "", message: "", role: "", product: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [guarantorData, setGuarantorData] = useState({
    firstname: "", surname: "", email: "", phone: "", businessName: "", website: "",
  });
  const [guarantorLoading, setGuarantorLoading] = useState(false);
  const [guarantorSuccess, setGuarantorSuccess] = useState(false);

  const handleGuarantorChange = (e) => {
    setGuarantorData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleGuarantorSubmit = async (e) => {
    e.preventDefault();
    setGuarantorLoading(true);
    const { firstname, surname, email, phone, businessName, website } = guarantorData;
    try {
      const { error } = await supabase.from('Guarantors').insert([{ firstname, surname, email, phone, businessName, website }]);
      if (error) throw error;

      const response = await fetch('/api/send-guarantor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstname, surname, email, phone, businessName, website }),
      });
      const result = await response.json();
      if (response.ok) {
        setGuarantorSuccess(true);
        setGuarantorData({ firstname: "", surname: "", email: "", phone: "", businessName: "", website: "" });
        setTimeout(() => setGuarantorSuccess(false), 6000);
      } else {
        alert(result.message || 'Error sending form, please try again.');
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Something went wrong. Please try again.');
    }
    setGuarantorLoading(false);
  };

  const handleRoleChange = (e) => {
    const selected = e.target.value;
    setFormData(prev => ({ ...prev, role: selected }));
    setRole(selected);
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { firstname, email, message, phone, surname, businessName, website, role, product } = formData;
    try {
      const { error } = await supabase.from('Partner_Investor').insert([{ firstname, email, message, phone, surname, businessName, website, role, product }]);
      if (error) throw error;

      const response = await fetch('/api/send-partner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstname, email, message, phone, surname, businessName, website, role, product }),
      });
      const result = await response.json();
      if (response.ok) {
        setSuccess(true);
        setFormData({ firstname: "", surname: "", email: "", phone: "", businessName: "", website: "", message: "", role: "", product: "" });
        setRole("");
        setTimeout(() => setSuccess(false), 6000);
      } else {
        alert(result.message || 'Error sending email, please try again.');
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Something went wrong. Please try again.');
    }
    setLoading(false);
  };

  const inputClass = 'w-full border border-gray-200 focus:border-[#3dba6f] focus:ring-2 focus:ring-[#3dba6f]/20 rounded-xl px-4 py-3 text-[14px] text-gray-700 outline-none transition-all duration-200 bg-white';
  const labelClass = 'block text-[#1a4731] text-[13px] font-semibold mb-1.5';

  return (
    <div className='bg-white min-h-screen'>
      <Nav />

      {/* ── Hero ── */}
      <section className='relative bg-[#1a4731] overflow-hidden'>
        <div className='absolute inset-0 opacity-5'
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '28px 28px' }} />
        <div className='absolute bottom-0 left-0 w-96 h-96 rounded-full bg-[#3dba6f]/15 blur-3xl pointer-events-none' />
        <div className='absolute top-0 right-0 w-72 h-72 rounded-full bg-[#3dba6f]/10 blur-3xl pointer-events-none' />

        <div className='relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-24 flex flex-col lg:flex-row items-center gap-12'>
          <motion.div
            initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9 }}
            className='flex-1 text-center lg:text-left'
          >
            <div className='flex items-center justify-center lg:justify-start gap-3 mb-4'>
              <span className='h-px w-10 bg-[#3dba6f]' />
              <span className='text-[#3dba6f] text-xs font-semibold tracking-[0.22em] uppercase'>Partnership & Investment</span>
              <span className='h-px w-10 bg-[#3dba6f]' />
            </div>
            <h1 className='text-white text-[34px] md:text-[50px] font-bold leading-tight'>
              Partner with{' '}
              <span className='text-[#3dba6f]'>COR'N Enterprises</span>
              <br className='hidden md:block' /> Limited
            </h1>
            <p className='text-green-200/70 text-[16px] mt-5 max-w-xl leading-relaxed'>
              At COR'N Enterprises Limited, we are building more than a lending company — we are creating
              a community of impact-driven professionals and partners committed to financial inclusion across Nigeria.
              Join us in shaping the future of accessible finance.
            </p>
            <a
              href='#partner-form'
              className='mt-8 inline-flex items-center gap-2 bg-[#3dba6f] hover:bg-[#2ea85f] text-white font-bold text-sm px-7 py-3.5 rounded-full transition-all duration-300 shadow-lg hover:shadow-[#3dba6f]/30 hover:scale-105'
            >
              Become a Partner <ArrowRight size={16} />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, delay: 0.2 }}
            className='flex-shrink-0'
          >
            <img src={icon2} loading='lazy' alt='Partnership'
              className='w-[300px] md:w-[380px] lg:w-[440px] rounded-2xl shadow-2xl shadow-black/30 object-cover' />
          </motion.div>
        </div>
      </section>

      {/* ── Why Partner ── */}
      <section className='py-20 px-6 md:px-12 lg:px-20 bg-white'>
        <div className='max-w-6xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8 }}
            className='text-center mb-12'
          >
            <div className='flex items-center justify-center gap-3 mb-3'>
              <span className='h-px w-8 bg-[#3dba6f]' />
              <span className='text-[#3dba6f] text-xs font-semibold tracking-[0.2em] uppercase'>Our Advantage</span>
              <span className='h-px w-8 bg-[#3dba6f]' />
            </div>
            <h2 className='text-[#1a4731] text-[28px] md:text-[38px] font-bold'>
              Why Partner with COR'N Enterprises?
            </h2>
          </motion.div>

          <motion.div
            variants={containerVariants} initial='hidden' whileInView='show' viewport={{ once: true }}
            className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'
          >
            {whyPartner.map((item, i) => (
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

      {/* ── Vision & Mission ── */}
      <section className='py-20 px-6 md:px-12 lg:px-20 bg-[#f0f9f4]'>
        <div className='max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8'>
          {[
            {
              icon: <Eye size={28} />,
              title: 'Our Vision',
              text: 'To become the most trusted and accessible financial services company, pioneering fast and responsible lending for individuals and businesses across Nigeria.',
            },
            {
              icon: <Flag size={28} />,
              title: 'Our Mission',
              text: 'To provide simple, transparent, and swift financial solutions that empower salary earners, civil servants, business owners, and SMEs to achieve their financial goals.',
            },
          ].map((item, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.15 }}
              className='bg-white border border-green-100 rounded-2xl p-8 shadow-sm text-center hover:shadow-md transition-all duration-300'
            >
              <div className='w-14 h-14 rounded-2xl bg-[#1a4731] text-[#3dba6f] flex items-center justify-center mx-auto mb-5'>
                {item.icon}
              </div>
              <h3 className='text-[#1a4731] font-bold text-[22px] mb-3'>{item.title}</h3>
              <p className='text-gray-500 text-[14px] leading-relaxed'>{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Photo strip ── */}
      <section className='py-16 px-6 md:px-12 lg:px-20 bg-white'>
        <div className='max-w-6xl mx-auto'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
            {[rose, store, truck].map((img, i) => (
              <div key={i} className='overflow-hidden rounded-2xl shadow-sm group'>
                <img src={img} alt='' loading='lazy'
                  className='w-full h-[220px] object-cover group-hover:scale-105 transition-transform duration-500' />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact info + closing CTA ── */}
      <section className='py-16 px-6 md:px-12 lg:px-20 bg-[#f0f9f4]'>
        <div className='max-w-4xl mx-auto text-center'>
          <p className='text-[#1a4731] text-[16px] leading-relaxed font-medium italic border-l-4 border-[#3dba6f] pl-5 text-left bg-white py-4 pr-4 rounded-r-2xl shadow-sm mb-10'>
            "Let's build something meaningful — together. At COR'N Enterprises Limited, every partnership is a commitment to impact, integrity, and shared growth."
          </p>
          <div className='flex flex-col sm:flex-row items-center justify-center gap-6 text-[14px] text-gray-600'>
            <div className='flex items-center gap-2'>
              <MapPin size={16} className='text-[#3dba6f]' />
              Head Office: Jalingo, Taraba State, Nigeria
            </div>
            <div className='flex items-center gap-2'>
              <Phone size={16} className='text-[#3dba6f]' />
              <a href='tel:+2348131908385' className='hover:text-[#1a4731] transition-colors'>+234 813 190 8385</a>
            </div>
            <div className='flex items-center gap-2'>
              <Mail size={16} className='text-[#3dba6f]' />
              <a href='mailto:admin@cornenterprise.com' className='hover:text-[#1a4731] transition-colors'>admin@cornenterprise.com</a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Partner Form ── */}
      <section id='partner-form' className='py-20 px-6 md:px-12 lg:px-20 bg-white'>
        <div className='max-w-4xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8 }}
            className='text-center mb-12'
          >
            <div className='flex items-center justify-center gap-3 mb-3'>
              <span className='h-px w-8 bg-[#3dba6f]' />
              <span className='text-[#3dba6f] text-xs font-semibold tracking-[0.2em] uppercase'>Get Started</span>
              <span className='h-px w-8 bg-[#3dba6f]' />
            </div>
            <h2 className='text-[#1a4731] text-[28px] md:text-[38px] font-bold'>Become a Partner or Investor</h2>
            <p className='text-gray-500 text-[15px] mt-3 max-w-xl mx-auto'>
              Ready to invest or collaborate? Fill the form below and a member of our executive team will reach out to you.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8 }}
            className='bg-white border border-green-100 rounded-2xl p-8 md:p-10 shadow-sm'
          >
            {success && (
              <div className='mb-6 flex items-center gap-2 bg-[#f0f9f4] border border-[#3dba6f]/40 text-[#1a4731] px-5 py-3 rounded-xl text-[14px] font-semibold'>
                <CheckCircle size={18} className='text-[#3dba6f]' />
                Thank you! Your application has been submitted. We'll be in touch soon.
              </div>
            )}

            <form onSubmit={handleSubmit} className='space-y-5'>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                <div>
                  <label className={labelClass}>First Name</label>
                  <input type='text' name='firstname' value={formData.firstname} onChange={handleChange}
                    placeholder='Enter your first name' required className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Surname</label>
                  <input type='text' name='surname' value={formData.surname} onChange={handleChange}
                    placeholder='Enter your surname' required className={inputClass} />
                </div>
              </div>

              {/* Contact row */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                <div>
                  <label className={labelClass}>Email Address</label>
                  <input type='email' name='email' value={formData.email} onChange={handleChange}
                    placeholder='Your email address' required className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Phone Number</label>
                  <input type='tel' name='phone' value={formData.phone} onChange={handleChange}
                    placeholder='Your phone number' required className={inputClass} />
                </div>
              </div>

              {/* Business + Role row */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                <div>
                  <label className={labelClass}>Business / Company Name</label>
                  <input type='text' name='businessName' value={formData.businessName} onChange={handleChange}
                    placeholder='Your business name' required className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Partnership Role</label>
                  <select name='role' value={formData.role} onChange={handleRoleChange} required className={inputClass}>
                    <option value=''>Select your role</option>
                    <option value='Buyer'>Partners</option>
                    <option value='investor'>Investor</option>
                    <option value='guarantor'>Guarantor</option>
                  </select>
                </div>
              </div>


              {/* Website */}
              <div>
                <label className={labelClass}>Business Website <span className='text-gray-400 font-normal'>(Optional)</span></label>
                <input type='url' name='website' value={formData.website} onChange={handleChange}
                  placeholder='https://yourwebsite.com' className={inputClass} />
              </div>

              {/* Message */}
              <div>
                <label className={labelClass}>Tell Us About Your Business</label>
                <textarea name='message' value={formData.message} onChange={handleChange}
                  placeholder="Why do you want to partner or invest with COR\'N Enterprises?" required rows={5}
                  className={`${inputClass} resize-none`} />
              </div>

              <button
                type='submit' disabled={loading}
                className='w-full bg-[#1a4731] hover:bg-[#2d7a4f] disabled:opacity-60 text-white font-bold text-[14px] py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.01] shadow-md'
              >
                {loading ? 'Submitting...' : <><Send size={16} /> Submit Application</>}
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* ── Guarantors Form ── */}
      <section id='guarantor-form' className='py-20 px-6 md:px-12 lg:px-20 bg-[#f0f9f4]'>
        <div className='max-w-4xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8 }}
            className='text-center mb-12'
          >
            <div className='flex items-center justify-center gap-3 mb-3'>
              <span className='h-px w-8 bg-[#3dba6f]' />
              <span className='text-[#3dba6f] text-xs font-semibold tracking-[0.2em] uppercase'>Guarantors</span>
              <span className='h-px w-8 bg-[#3dba6f]' />
            </div>
            <h2 className='text-[#1a4731] text-[28px] md:text-[38px] font-bold'>Guarantor Registration</h2>
            <p className='text-gray-500 text-[15px] mt-3 max-w-xl mx-auto'>
              Are you standing as a guarantor? Fill in your details below and our team will process your registration promptly.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8 }}
            className='bg-white border border-green-100 rounded-2xl p-8 md:p-10 shadow-sm'
          >
            {guarantorSuccess && (
              <div className='mb-6 flex items-center gap-2 bg-[#f0f9f4] border border-[#3dba6f]/40 text-[#1a4731] px-5 py-3 rounded-xl text-[14px] font-semibold'>
                <CheckCircle size={18} className='text-[#3dba6f]' />
                Thank you! Your guarantor details have been submitted. We'll be in touch soon.
              </div>
            )}

            <form onSubmit={handleGuarantorSubmit} className='space-y-5'>

              {/* Name row */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                <div>
                  <label className={labelClass}>First Name</label>
                  <input type='text' name='firstname' value={guarantorData.firstname} onChange={handleGuarantorChange}
                    placeholder='Enter your first name' required className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Surname</label>
                  <input type='text' name='surname' value={guarantorData.surname} onChange={handleGuarantorChange}
                    placeholder='Enter your surname' required className={inputClass} />
                </div>
              </div>

              {/* Contact row */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                <div>
                  <label className={labelClass}>Email Address</label>
                  <input type='email' name='email' value={guarantorData.email} onChange={handleGuarantorChange}
                    placeholder='Your email address' required className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Phone Number</label>
                  <input type='tel' name='phone' value={guarantorData.phone} onChange={handleGuarantorChange}
                    placeholder='Your phone number' required className={inputClass} />
                </div>
              </div>

              {/* Business row */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                <div>
                  <label className={labelClass}>Business / Company Name</label>
                  <input type='text' name='businessName' value={guarantorData.businessName} onChange={handleGuarantorChange}
                    placeholder='Your business name' required className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Business Website <span className='text-gray-400 font-normal'>(Optional)</span></label>
                  <input type='url' name='website' value={guarantorData.website} onChange={handleGuarantorChange}
                    placeholder='https://yourwebsite.com' className={inputClass} />
                </div>
              </div>

              <button
                type='submit' disabled={guarantorLoading}
                className='w-full bg-[#1a4731] hover:bg-[#2d7a4f] disabled:opacity-60 text-white font-bold text-[14px] py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.01] shadow-md'
              >
                {guarantorLoading ? 'Submitting...' : <><Send size={16} /> Submit Guarantor Form</>}
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PartnerPage;