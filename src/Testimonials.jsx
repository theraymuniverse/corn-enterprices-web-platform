import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Lock, TrendingUp, Quote } from 'lucide-react';

const testimonials = [
  {
    text: "I needed urgent funds for a family responsibility, and COR'N Enterprises handled my request faster than I expected. The process was simple and professional.",
    name: "Adamu",
    location: "Jalingo",
  },
  {
    text: "As a small business owner, quick access to funds helped me restock my shop. Their service was transparent and straightforward.",
    name: "Jimoh",
    location: "Taraba",
  },
  {
    text: "The approval was truly fast. I submitted my documents and received confirmation within minutes. I appreciate their professionalism.",
    name: "Abel",
    location: "Abuja",
  },
];

const trustPoints = [
  {
    icon: <ShieldCheck size={22} />,
    title: 'Commitment to Responsible Lending',
    desc: 'Duly registered with the Corporate Affairs Commission (CAC) and adhering to recognized consumer protection standards — ensuring services that are fair, transparent, and accountable.',
  },
  {
    icon: <Lock size={22} />,
    title: 'Protection of Client Information',
    desc: 'All client data submitted during loan applications is handled with strict confidentiality and secure verification procedures.',
  },
  {
    icon: <TrendingUp size={22} />,
    title: 'Building Financial Confidence',
    desc: 'Every successful loan strengthens the relationship we build with our clients — creating a lending experience people can depend on with confidence.',
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goTo = (i) => {
    setDirection(i > currentIndex ? 1 : -1);
    setCurrentIndex(i);
  };

  return (
    <section className='relative bg-[#f0f9f4] py-20 px-5 md:px-12 lg:px-24 overflow-hidden'>

      {/* Background accents */}
      <div className='absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-[#3dba6f]/10 blur-3xl pointer-events-none' />
      <div className='absolute bottom-0 right-0 w-64 h-64 rounded-full bg-[#1a4731]/8 blur-2xl pointer-events-none' />

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
          <span className='text-[#3dba6f] text-xs font-semibold tracking-[0.22em] uppercase'>Client Trust & Testimonials</span>
          <span className='h-px w-10 bg-[#3dba6f]' />
        </div>

        <h2 className='text-[#1a4731] text-[30px] md:text-[42px] font-bold leading-tight'>
          Trusted by Individuals{' '}
          <span className='text-[#3dba6f]'>and Businesses</span>
        </h2>

        <p className='text-gray-500 text-[15px] md:text-[16px] mt-5 leading-relaxed'>
          Trust is not merely spoken — it is demonstrated through every interaction, every approved loan,
          and every satisfied client. Since our establishment in{' '}
          <span className='font-semibold text-[#1a4731]'>2023</span>, we have remained committed to responsible,
          transparent, and professional lending across{' '}
          <span className='font-semibold text-[#1a4731]'>Taraba State and Abuja</span>.
        </p>
      </motion.div>

      {/* Trust pillars */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className='grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto mb-14 relative z-10'
      >
        {trustPoints.map((pt, i) => (
          <div key={i} className='bg-white border border-green-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-[#3dba6f]/40 transition-all duration-300'>
            <div className='w-10 h-10 rounded-lg bg-[#1a4731]/10 text-[#1a4731] flex items-center justify-center mb-4'>
              {pt.icon}
            </div>
            <h3 className='text-[#1a4731] font-semibold text-[15px] mb-2'>{pt.title}</h3>
            <p className='text-gray-500 text-[13px] leading-relaxed'>{pt.desc}</p>
          </div>
        ))}
      </motion.div>

      {/* Divider */}
      <div className='max-w-5xl mx-auto flex items-center gap-4 mb-12 relative z-10'>
        <div className='flex-1 h-px bg-green-200' />
        <span className='text-[#3dba6f] text-xs tracking-[0.2em] uppercase font-semibold whitespace-nowrap'>What Our Clients Say</span>
        <div className='flex-1 h-px bg-green-200' />
      </div>

      {/* Testimonial carousel */}
      <div className='max-w-2xl mx-auto text-center relative z-10 min-h-[220px]'>
        {/* Quote icon */}
        <Quote className='text-[#3dba6f]/30 mx-auto mb-4' size={52} />

        <AnimatePresence mode='wait' custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            initial={{ opacity: 0, x: direction * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -40 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            {/* Quote card */}
            <div className='bg-white border border-green-100 rounded-2xl px-8 py-8 shadow-sm'>
              <p className='text-[#1a4731] text-[17px] md:text-[20px] italic leading-relaxed font-light'>
                "{testimonials[currentIndex].text}"
              </p>
              <div className='mt-6 flex flex-col items-center gap-1'>
                <div className='h-px w-10 bg-[#3dba6f]' />
                <p className='text-[#1a4731] font-bold text-[15px] mt-2'>
                  {testimonials[currentIndex].name}
                </p>
                <p className='text-gray-400 text-[13px]'>
                  {testimonials[currentIndex].location}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dot indicators */}
        <div className='flex justify-center gap-2 mt-8'>
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`rounded-full transition-all duration-300 ${
                i === currentIndex ? 'w-7 h-2 bg-[#3dba6f]' : 'w-2 h-2 bg-green-200 hover:bg-green-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Closing statement */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.4 }}
        className='text-center text-gray-400 text-[14px] mt-12 max-w-xl mx-auto italic relative z-10'
      >
        At COR'N Enterprises Limited,{' '}
        <span className='text-[#1a4731] font-semibold not-italic'>your trust remains our most valued responsibility.</span>
      </motion.p>
    </section>
  );
};

export default Testimonials;