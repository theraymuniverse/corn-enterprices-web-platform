import slogon from './assets/Logo2.png'
import { Menu, X, LogIn, User, PhoneCall, MessageCircle } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from 'react-router-dom'
import { supabase } from './Authenticcation/supabaseClient';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Loan Services', to: '/products' },
  { label: 'About Us', to: '/about' },
  { label: 'Apply Now', to: '/contact_us', highlight: true },
  { label: 'Partner With Us', to: '/partner' },
  { label: 'Careers', to: '/career' },
];

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [location]);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsLoggedIn(!!session);
      if (session?.user) {
        const { data } = await supabase
          .from('profiles').select('*').eq('id', session.user.id).single();
        if (data) setProfile(data);
      } else { setProfile(null); }
    };
    checkUser();
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
    });
    return () => listener?.subscription.unsubscribe();
  }, []);

  const isActive = (to) =>
    to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);

  return (
    <>
      {/* Announcement bar */}
      <div className='bg-[#1a4731] text-white text-[12px] font-semibold text-center py-2 px-4 tracking-wide hidden md:flex items-center justify-center gap-2'>
        <PhoneCall size={13} className='text-[#3dba6f]' />
        Fast loan approvals in under 3 minutes — serving Taraba State &amp; Abuja
      </div>

      {/* Main navbar */}
      <nav className={`sticky top-0 z-50 w-full transition-all duration-300 border-b ${
        scrolled
          ? 'bg-white/97 backdrop-blur-md shadow-md shadow-green-900/10 border-green-100'
          : 'bg-white border-green-100'
      }`}>
        <div className='max-w-7xl mx-auto px-5 md:px-10 lg:px-16 flex items-center justify-between h-[70px]'>

          {/* Logo */}
          <Link to='/' className='flex items-center gap-3 flex-shrink-0'>
            <img src={slogon} alt="COR'N Enterprises" className='h-[52px] w-auto' />
            <div className='hidden sm:flex flex-col leading-tight'>
              <span className='text-[#1a4731] font-bold text-[14px] tracking-wide'>COR'N Enterprises</span>
              <span className='text-[#3dba6f] text-[10px] tracking-[0.15em] uppercase font-semibold'>Limited</span>
            </div>
          </Link>

          {/* Desktop links */}
          <ul className='hidden lg:flex items-center gap-1'>
            {navLinks.map((link) => (
              <li key={link.to}>
                {link.highlight ? (
                  <Link
                    to={link.to}
                    className='ml-2 bg-[#1a4731] hover:bg-[#2d7a4f] text-white font-bold text-[13px] px-5 py-2.5 rounded-full transition-all duration-200 tracking-wide shadow-md hover:shadow-green-800/30 hover:scale-105'
                  >
                    {link.label}
                  </Link>
                ) : (
                  <Link
                    to={link.to}
                    className={`relative px-4 py-2 text-[13px] font-medium transition-colors duration-200 rounded-md group ${
                      isActive(link.to) ? 'text-[#1a4731]' : 'text-gray-500 hover:text-[#1a4731]'
                    }`}
                  >
                    {link.label}
                    <span className={`absolute bottom-0 left-4 right-4 h-[2px] rounded-full bg-[#3dba6f] transition-transform duration-200 origin-left ${
                      isActive(link.to) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`} />
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* Desktop auth */}
          <div className='hidden lg:flex items-center gap-4'>
            {isLoggedIn ? (
              <div className='flex items-center gap-3'>
                <span className='text-[#1a4731] text-[13px] font-semibold'>Hi, {profile?.firstname || 'Client'}</span>
                <Link to='/signout' className='flex items-center gap-2 border border-green-200 hover:border-[#3dba6f] text-gray-500 hover:text-[#1a4731] text-[13px] px-4 py-2 rounded-full transition-all duration-200'>
                  <User size={15} /> Sign Out
                </Link>
              </div>
            ) : (
              <Link to='/login' className='flex items-center gap-2 border border-green-200 hover:border-[#3dba6f] text-gray-500 hover:text-[#1a4731] text-[13px] px-4 py-2 rounded-full transition-all duration-200'>
                <LogIn size={15} /> Client Login
              </Link>
            )}
          </div>

          {/* Mobile hamburger */}
          <button className='lg:hidden text-[#1a4731] p-2 rounded-md hover:bg-green-50 transition-colors' onClick={() => setIsOpen(!isOpen)} aria-label='Toggle menu'>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile drawer */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className='bg-white border-t border-green-100 px-5 py-6'>
            <p className='text-[#3dba6f] text-[11px] tracking-[0.2em] uppercase font-semibold mb-5'>Fast · Flexible · Professional</p>
            <ul className='flex flex-col gap-1'>
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className={`flex items-center justify-between px-4 py-3 rounded-xl text-[14px] font-medium transition-all duration-200 ${
                    link.highlight ? 'bg-[#1a4731] text-white font-bold mt-2'
                      : isActive(link.to) ? 'bg-green-50 text-[#1a4731]'
                      : 'text-gray-600 hover:bg-green-50 hover:text-[#1a4731]'
                  }`}>
                    {link.label}
                    {isActive(link.to) && !link.highlight && <span className='w-1.5 h-1.5 rounded-full bg-[#3dba6f]' />}
                  </Link>
                </li>
              ))}
            </ul>
            <div className='mt-5 pt-5 border-t border-green-100'>
              {isLoggedIn ? (
                <Link to='/signout' className='flex items-center gap-2 text-gray-500 hover:text-[#1a4731] text-[14px] px-4 py-3'>
                  <User size={16} /> Hi, {profile?.firstname || 'Client'} — Sign Out
                </Link>
              ) : (
                <Link to='/login' className='flex items-center gap-2 text-gray-500 hover:text-[#1a4731] text-[14px] px-4 py-3 transition-colors'>
                  <LogIn size={16} /> Client Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* ── Global floating WhatsApp button ── */}
      <a
        href="https://wa.me/2348023447314?text=Hello%20COR'N%20Enterprises%20Limited%2C%20I%20would%20like%20to%20apply%20for%20a%20loan."
        target='_blank'
        rel='noreferrer'
        aria-label='Apply for a loan via WhatsApp'
        className='fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#3dba6f] hover:bg-[#2ea85f] text-white font-bold text-[13px] pl-4 pr-5 py-3 rounded-full shadow-xl hover:shadow-[#3dba6f]/40 hover:scale-105 transition-all duration-300'
      >
        <MessageCircle size={20} />
        <span className='hidden sm:inline'>Apply via WhatsApp</span>
      </a>
    </>
  );
};

export default Nav;