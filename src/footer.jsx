import React, { useState } from 'react';
import Logo from './assets/Logo2.png';
import frame1 from './assets/Frame 11.png';
import frame2 from './assets/Frame 12.png';
import frame3 from './assets/Frame 14.png';
import frame5 from './assets/frame 5.png';
import frame6 from './assets/frame 6.png';
import { supabase } from './Authenticcation/supabaseClient';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, ArrowRight, CheckCircle } from 'lucide-react';

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'Loan Services', to: '/products' },
  { label: 'About Us', to: '/about' },
  { label: 'Apply Now', to: '/contact_us' },
  { label: 'Partner With Us', to: '/partner' },
  { label: 'Careers', to: '/career' },
];

const loanTypes = [
  'Personal Loans',
  'Salary Advance',
  'Business Loans',
  'SME Support Loans',
  'Civil Servant Loans',
];

const Footer = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.from('NewsLetter').insert([{ email }]);
      if (error) throw error;

      const response = await fetch('/api/send-newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const result = await response.json();
      if (response.ok) {
        setSuccess(true);
        setEmail('');
        setTimeout(() => setSuccess(false), 5000);
      } else {
        alert(result.message || 'Error sending email, please try again.');
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Something went wrong. Please try again.');
    }
    setLoading(false);
  };

  return (
    <footer className='bg-[#1a4731] text-white'>

      {/* Newsletter strip */}
      <div className='bg-[#0d2b1a] border-b border-white/10'>
        <div className='max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-10 flex flex-col lg:flex-row items-center justify-between gap-6'>
          <div className='text-center lg:text-left'>
            <h4 className='text-white font-bold text-[20px] md:text-[22px] leading-snug'>
              Stay Informed — Subscribe to Our Newsletter
            </h4>
            <p className='text-green-300/70 text-[14px] mt-1'>
              Get the latest updates on loan products, rates, and financial tips.
            </p>
          </div>

          {success ? (
            <div className='flex items-center gap-2 bg-[#3dba6f]/20 border border-[#3dba6f]/40 text-[#3dba6f] px-6 py-3 rounded-full text-[14px] font-semibold'>
              <CheckCircle size={18} />
              Thank you for subscribing!
            </div>
          ) : (
            <form onSubmit={handleSubmit} className='flex items-center w-full max-w-md bg-white/10 border border-white/20 rounded-full overflow-hidden focus-within:border-[#3dba6f]/60 transition-colors duration-200'>
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className='flex-1 bg-transparent text-white placeholder-white/40 text-[14px] px-5 py-3 outline-none'
              />
              <button
                type="submit"
                className='bg-[#3dba6f] hover:bg-[#2ea85f] text-white font-semibold text-[13px] px-6 py-3 transition-colors duration-200 flex items-center gap-1.5 whitespace-nowrap'
              >
                {loading ? 'Subscribing...' : (
                  <><span>Subscribe</span><ArrowRight size={14} /></>
                )}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Main footer body */}
      <div className='max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-14'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10'>

          {/* Brand column */}
          <div className='lg:col-span-1'>
            <div className='flex items-center gap-3 mb-5'>
              <img src={Logo} alt="COR'N Enterprises" className='w-[52px] h-auto' loading='lazy' />
              <div className='flex flex-col leading-tight'>
                <span className='text-white font-bold text-[14px]'>COR'N Enterprises</span>
                <span className='text-[#3dba6f] text-[10px] tracking-[0.15em] uppercase font-semibold'>Limited</span>
              </div>
            </div>
            <p className='text-green-200/60 text-[13px] leading-relaxed mb-6'>
              Providing fast, flexible, and professional lending solutions to individuals and businesses across Taraba State and Abuja since 2023.
            </p>
            {/* Social icons */}
            <div className='flex items-center gap-3 flex-wrap'>
              {[
                { href: 'https://wa.me/2348131906385', src: frame1, alt: 'WhatsApp' },
                { href: 'https://www.facebook.com/profile.php?id=61574547677212', src: frame2, alt: 'Facebook' },
                { href: 'https://www.instagram.com/corne_nterprises?igsh=MWc3YWZyd3c3NG1kbQ==', src: frame3, alt: 'Instagram' },
                { href: 'https://www.youtube.com/@CornEnterprises', src: frame5, alt: 'YouTube' },
                { href: 'https://x.com/EnterprisesCorn?t=Oeh5Vn28HSKbeQVuAZowQQ&s=09', src: frame6, alt: 'X (Twitter)' },
              ].map((social) => (
                <a
                  key={social.alt}
                  href={social.href}
                  target='_blank'
                  rel='noreferrer'
                  className='w-9 h-9 rounded-full bg-white/10 hover:bg-[#3dba6f]/30 border border-white/10 hover:border-[#3dba6f]/50 flex items-center justify-center transition-all duration-200'
                  aria-label={social.alt}
                >
                  <img src={social.src} alt={social.alt} className='w-[18px] h-[18px] object-contain' />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className='text-white font-bold text-[14px] tracking-wide uppercase mb-5 flex items-center gap-2'>
              <span className='w-5 h-[2px] bg-[#3dba6f] rounded-full' />
              Quick Links
            </h5>
            <ul className='space-y-2.5'>
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    onClick={() => window.scrollTo(0, 0)}
                    className='text-green-200/60 hover:text-[#3dba6f] text-[13px] transition-colors duration-200 flex items-center gap-2 group'
                  >
                    <ArrowRight size={12} className='opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-[#3dba6f]' />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Loan Types */}
          <div>
            <h5 className='text-white font-bold text-[14px] tracking-wide uppercase mb-5 flex items-center gap-2'>
              <span className='w-5 h-[2px] bg-[#3dba6f] rounded-full' />
              Our Services
            </h5>
            <ul className='space-y-2.5'>
              {loanTypes.map((type) => (
                <li key={type} className='text-green-200/60 text-[13px] flex items-center gap-2'>
                  <span className='w-1.5 h-1.5 rounded-full bg-[#3dba6f]/50 flex-shrink-0' />
                  {type}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h5 className='text-white font-bold text-[14px] tracking-wide uppercase mb-5 flex items-center gap-2'>
              <span className='w-5 h-[2px] bg-[#3dba6f] rounded-full' />
              Contact Us
            </h5>
            <ul className='space-y-4'>
              <li className='flex items-start gap-3 text-[13px] text-green-200/60'>
                <MapPin size={16} className='text-[#3dba6f] flex-shrink-0 mt-0.5' />
                <span>Taraba State & Abuja, Nigeria</span>
              </li>
              <li className='flex items-center gap-3 text-[13px]'>
                <Phone size={16} className='text-[#3dba6f] flex-shrink-0' />
                <a href='tel:+2348131906385' className='text-green-200/60 hover:text-[#3dba6f] transition-colors duration-200'>
                  +234 813 190 6385
                </a>
              </li>
              <li className='flex items-center gap-3 text-[13px]'>
                <Mail size={16} className='text-[#3dba6f] flex-shrink-0' />
                <a href='mailto:info@cornenterprise.com' className='text-green-200/60 hover:text-[#3dba6f] transition-colors duration-200 break-all'>
                  info@cornenterprise.com
                </a>
              </li>
            </ul>

            {/* CAC badge */}
            <div className='mt-6 inline-flex items-center gap-2 bg-white/8 border border-white/10 rounded-lg px-4 py-2.5'>
              <CheckCircle size={15} className='text-[#3dba6f]' />
              <span className='text-green-200/70 text-[12px] font-medium'>CAC Registered Company</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className='border-t border-white/10'>
        <div className='max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-[12px] text-green-200/40'>
          <p>© {new Date().getFullYear()} COR'N Enterprises Limited. All rights reserved.</p>
          <a href="https://www.theraymuniverse.com" target='_blank' rel='noopener noreferrer' className='text-green-200/60 hover:text-[#3dba6f] transition-colors duration-200'>
            Made with ❤️ by <span className='text-green-200/60'>Raym Universe</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;