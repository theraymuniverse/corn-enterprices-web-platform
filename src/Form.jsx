import { useState } from "react";
import { supabase } from "./Authenticcation/supabaseClient";
import { CheckCircle, AlertCircle, Send } from "lucide-react";

const API_BASE = 'https://www.cornenterprise.com';

const Form = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState(null);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors(prev => ({ ...prev, [e.target.name]: null }));
    if (submitError) setSubmitError(null);
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Name is required';
    if (!formData.email.trim()) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = 'Enter a valid email address';
    if (!formData.message.trim()) errs.message = 'Message cannot be empty';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setLoading(true);
    setSubmitError(null);

    const { name, email, message } = formData;

    try {
      const { error: dbError } = await supabase
        .from('contacts')
        .insert([{ name, email, message }]);
      if (dbError) console.warn('Supabase insert warning:', dbError.message);

      const response = await fetch(`${API_BASE}/api/send-contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });

      let result = {};
      const contentType = response.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        result = await response.json();
      } else {
        const text = await response.text();
        console.error('Non-JSON response from server:', text);
        result = { message: 'Server returned an unexpected response.' };
      }

      if (response.ok) {
        setSuccess(true);
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setSuccess(false), 7000);
      } else {
        setSubmitError(result.message || 'Something went wrong. Please try again.');
      }

    } catch (err) {
      console.error('Network error:', err.message);
      setSubmitError('Unable to reach the server. Please contact us via WhatsApp or email directly.');
    }

    setLoading(false);
  };

  const inputClass = (field) =>
    `w-full border rounded-xl px-4 py-3 text-[14px] text-gray-700 outline-none transition-all duration-200 bg-white placeholder-gray-400 ${
      errors[field]
        ? 'border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100'
        : 'border-gray-200 focus:border-[#3dba6f] focus:ring-2 focus:ring-[#3dba6f]/20'
    }`;

  return (
    <form onSubmit={handleSubmit} className="space-y-5 w-full">

      {/* Success banner */}
      {success && (
        <div className="flex items-start gap-2 bg-[#f0f9f4] border border-[#3dba6f]/40 text-[#1a4731] px-4 py-3 rounded-xl text-[13px] font-semibold">
          <CheckCircle size={16} className="text-[#3dba6f] flex-shrink-0 mt-0.5" />
          Thank you! Your message has been sent. We'll be in touch shortly.
        </div>
      )}

      {/* Error banner */}
      {submitError && (
        <div className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-[13px]">
          <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
          <span>
            {submitError}{' '}
            <a
              href="https://wa.me/2348023447314"
              target="_blank"
              rel="noreferrer"
              className="underline font-semibold hover:text-red-800"
            >
              WhatsApp us instead.
            </a>
          </span>
        </div>
      )}

      {/* Name */}
      <div>
        <label className="block text-[#1a4731] text-[13px] font-semibold mb-1.5">Full Name</label>
        <input
          type="text" name="name" value={formData.name} onChange={handleChange}
          placeholder="Enter your full name" className={inputClass('name')}
        />
        {errors.name && (
          <p className="flex items-center gap-1 text-red-500 text-[11px] mt-1">
            <AlertCircle size={11} />{errors.name}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="block text-[#1a4731] text-[13px] font-semibold mb-1.5">Email Address</label>
        <input
          type="email" name="email" value={formData.email} onChange={handleChange}
          placeholder="your@email.com" className={inputClass('email')}
        />
        {errors.email && (
          <p className="flex items-center gap-1 text-red-500 text-[11px] mt-1">
            <AlertCircle size={11} />{errors.email}
          </p>
        )}
      </div>

      {/* Message */}
      <div>
        <label className="block text-[#1a4731] text-[13px] font-semibold mb-1.5">Message</label>
        <textarea
          name="message" value={formData.message} onChange={handleChange}
          rows={5} placeholder="Write your message or inquiry..."
          className={`${inputClass('message')} resize-none`}
        />
        {errors.message && (
          <p className="flex items-center gap-1 text-red-500 text-[11px] mt-1">
            <AlertCircle size={11} />{errors.message}
          </p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit" disabled={loading}
        className="w-full inline-flex items-center justify-center gap-2 bg-[#1a4731] hover:bg-[#2d7a4f] disabled:opacity-60 text-white font-bold text-[14px] py-3.5 rounded-xl transition-all duration-300 hover:scale-[1.01] shadow-sm"
      >
        {loading ? (
          <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Sending...</>
        ) : (
          <><Send size={15} />Send Message</>
        )}
      </button>
    </form>
  );
};

export default Form;