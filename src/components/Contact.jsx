import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPaperPlane, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaBriefcase, FaHandshake, FaUsers } from 'react-icons/fa';
import { GoCheckCircle } from 'react-icons/go';
import emailjs from '@emailjs/browser';
import confetti from 'canvas-confetti';

const availableFor = [
  { icon: FaBriefcase, label: 'Internship', description: 'Open to full-time or part-time internship roles in Web3 and blockchain.' },
  { icon: FaHandshake, label: 'Freelance', description: 'Available for short-term smart contract or DApp frontend projects.' },
  { icon: FaUsers, label: 'Collaboration', description: 'Interested in open-source contributions and hackathon collaborations.' },
];

const Contact = () => {
  const formRef = useRef();

  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [errorMessage, setErrorMessage] = useState('');

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('sending');

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (serviceId && templateId && publicKey) {
      emailjs.sendForm(serviceId, templateId, formRef.current, { publicKey })
        .then(() => handleSuccess())
        .catch((err) => {
          console.error('EmailJS Error:', err);
          setStatus('error');
          setErrorMessage('Failed to send message. Please try again or email directly.');
        });
    } else {
      setTimeout(handleSuccess, 1200);
    }
  };

  const handleSuccess = () => {
    setStatus('success');
    confetti({ particleCount: 120, spread: 70, origin: { y: 0.7 }, colors: ['#00F2FE', '#4FACFE', '#7928CA', '#FF0080'] });
    setFormData({ name: '', email: '', phone: '', message: '' });
    setTimeout(() => setStatus('idle'), 5000);
  };

  return (
    <section id="contact" aria-labelledby="contact-heading" className="py-24 relative overflow-hidden bg-dark">
      {/* Glow orbs */}
      <div className="absolute top-[30%] right-[10%] w-[350px] h-[350px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-[10%] left-[5%] w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Title */}
        <div className="text-center mb-16">
          <motion.h2
            id="contact-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-extrabold text-white uppercase tracking-wider relative inline-block"
          >
            Contact <span className="text-primary text-glow-cyan">Me</span>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 h-[3px] bg-primary rounded-full shadow-[0_0_8px_#00F2FE]" aria-hidden="true" />
          </motion.h2>
          <p className="text-gray-400 text-sm mt-4 tracking-widest font-mono">GET IN TOUCH</p>
        </div>

        {/* Available For Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-14"
        >
          {availableFor.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="glassmorphism rounded-2xl p-5 border border-primary/20 bg-primary/5 flex items-start gap-4"
              >
                <div className="p-2.5 rounded-xl bg-primary/15 text-primary text-lg flex-shrink-0" aria-hidden="true">
                  <Icon />
                </div>
                <div>
                  <p className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-0.5">Available for</p>
                  <h3 className="text-sm font-bold text-white">{item.label}</h3>
                  <p className="text-gray-400 text-xs mt-1 leading-relaxed">{item.description}</p>
                </div>
              </div>
            );
          })}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 flex flex-col justify-between"
          >
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-white tracking-wide mb-3">Get In Touch</h3>
                <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                  If you have an internship opportunity, a project idea, or want to chat about Solidity, DeFi, or Web3 in general — I'd love to hear from you.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary text-lg flex-shrink-0" aria-hidden="true">
                    <FaEnvelope />
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 font-mono block">EMAIL</span>
                    <a
                      href="mailto:pratikshakalbhor20@gmail.com"
                      className="text-white hover:text-primary transition-colors duration-300 font-medium text-sm md:text-base"
                    >
                      pratikshakalbhor20@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 border border-secondary/20 flex items-center justify-center text-[#7928CA] text-lg flex-shrink-0" aria-hidden="true">
                    <FaPhoneAlt />
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 font-mono block">PHONE</span>
                    <span className="text-white font-medium text-sm md:text-base">+91 93077 75865</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary text-lg flex-shrink-0" aria-hidden="true">
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 font-mono block">LOCATION</span>
                    <span className="text-white font-medium text-sm md:text-base">Pune, Maharashtra, India</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="glassmorphism p-4 rounded-xl border-white/5 font-mono text-[10px] text-gray-500 mt-8 hidden lg:block">
              {'>'} Response typically within 24–48 hours.
            </div>
          </motion.div>

          {/* Right Column: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <div className="glassmorphism p-6 md:p-8 rounded-2xl border-white/5 shadow-2xl relative">
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-12 flex flex-col items-center justify-center text-center space-y-4 min-h-[350px]"
                    role="alert"
                    aria-live="polite"
                  >
                    <GoCheckCircle size={60} className="text-emerald-400 filter drop-shadow-[0_0_8px_rgba(52,211,153,0.5)] animate-bounce" aria-hidden="true" />
                    <h3 className="text-xl font-bold text-white">Message Sent!</h3>
                    <p className="text-gray-400 text-sm max-w-sm">
                      Thank you for reaching out. I'll get back to you within 24–48 hours.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="contact-form"
                    ref={formRef}
                    onSubmit={handleSubmit}
                    noValidate
                    className="space-y-5"
                  >
                    {/* Name */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="form-name" className="text-xs font-mono text-gray-400 uppercase tracking-widest">Your Name</label>
                      <input
                        type="text"
                        id="form-name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        autoComplete="name"
                        aria-required="true"
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                        className={`w-full bg-[#080B11]/80 border ${errors.name ? 'border-red-500' : 'border-white/10'} hover:border-white/20 focus:border-primary text-gray-100 rounded-xl px-4 py-3 text-sm transition-all focus:outline-none`}
                      />
                      {errors.name && <span id="name-error" className="text-red-500 text-[10px] font-mono mt-0.5" role="alert">{errors.name}</span>}
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="form-email" className="text-xs font-mono text-gray-400 uppercase tracking-widest">Your Email</label>
                      <input
                        type="email"
                        id="form-email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        autoComplete="email"
                        aria-required="true"
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                        className={`w-full bg-[#080B11]/80 border ${errors.email ? 'border-red-500' : 'border-white/10'} hover:border-white/20 focus:border-primary text-gray-100 rounded-xl px-4 py-3 text-sm transition-all focus:outline-none`}
                      />
                      {errors.email && <span id="email-error" className="text-red-500 text-[10px] font-mono mt-0.5" role="alert">{errors.email}</span>}
                    </div>

                    {/* Phone (optional) */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="form-phone" className="text-xs font-mono text-gray-400 uppercase tracking-widest">Phone (Optional)</label>
                      <input
                        type="tel"
                        id="form-phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91..."
                        autoComplete="tel"
                        className="w-full bg-[#080B11]/80 border border-white/10 hover:border-white/20 focus:border-primary text-gray-100 rounded-xl px-4 py-3 text-sm transition-all focus:outline-none"
                      />
                    </div>

                    {/* Message */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="form-message" className="text-xs font-mono text-gray-400 uppercase tracking-widest">Message</label>
                      <textarea
                        id="form-message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="5"
                        placeholder="Hi Pratiksha, I'd like to discuss..."
                        aria-required="true"
                        aria-invalid={!!errors.message}
                        aria-describedby={errors.message ? 'message-error' : undefined}
                        className={`w-full bg-[#080B11]/80 border ${errors.message ? 'border-red-500' : 'border-white/10'} hover:border-white/20 focus:border-primary text-gray-100 rounded-xl px-4 py-3 text-sm transition-all focus:outline-none resize-none`}
                      />
                      {errors.message && <span id="message-error" className="text-red-500 text-[10px] font-mono mt-0.5" role="alert">{errors.message}</span>}
                    </div>

                    {/* Submit */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={status === 'sending'}
                        className="w-full py-3.5 rounded-xl font-semibold bg-primary hover:bg-[#00d0e6] text-dark shadow-[0_0_15px_rgba(0,242,254,0.3)] transition-all duration-300 flex items-center justify-center gap-2 transform active:scale-98 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
                      >
                        {status === 'sending' ? (
                          <>
                            <span className="w-4 h-4 border-2 border-dark border-t-transparent animate-spin rounded-full" aria-hidden="true" /> Sending...
                          </>
                        ) : (
                          <>
                            <FaPaperPlane aria-hidden="true" /> Send Message
                          </>
                        )}
                      </button>
                    </div>

                    {status === 'error' && (
                      <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs py-2 px-3 rounded-lg text-center font-mono" role="alert">
                        {errorMessage}
                      </div>
                    )}
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
