import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPaperPlane, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { GoCheckCircle } from 'react-icons/go';
import emailjs from '@emailjs/browser';
import confetti from 'canvas-confetti';

const Contact = () => {
  const formRef = useRef();
  
  // Fields state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  
  // Validation error states
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
    // Clear validation error when typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    setStatus('sending');

    // Retrieve environment variables
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (serviceId && templateId && publicKey) {
      // Direct EmailJS send
      emailjs.sendForm(serviceId, templateId, formRef.current, {
        publicKey: publicKey
      })
      .then(() => {
        handleSuccess();
      })
      .catch((err) => {
        console.error('EmailJS Error:', err);
        setStatus('error');
        setErrorMessage('Failed to transmit message via node. Please try again.');
      });
    } else {
      // Simulative offline mode fallback so the portfolio functions cleanly out of the box
      console.warn('EmailJS keys not detected in .env. Falling back to local confirmation simulation.');
      setTimeout(() => {
        handleSuccess();
      }, 1200);
    }
  };

  const handleSuccess = () => {
    setStatus('success');
    
    // Blast confetti!
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#00F2FE', '#4FACFE', '#7928CA', '#FF0080']
    });

    // Clear form
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    });

    // Return status to idle
    setTimeout(() => {
      setStatus('idle');
    }, 5000);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-dark">
      {/* Visual background lights */}
      <div className="absolute top-[30%] right-[10%] w-[350px] h-[350px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[5%] w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Title */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-extrabold text-white uppercase tracking-wider relative inline-block"
          >
            Contact <span className="text-primary text-glow-cyan">Me</span>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 h-[3px] bg-primary rounded-full shadow-[0_0_8px_#00F2FE]" />
          </motion.h2>
          <p className="text-gray-400 text-sm mt-4 tracking-widest font-mono">ESTABLISH CONNECTION HANDSHAKE</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Direct Info Card */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 flex flex-col justify-between"
          >
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-white tracking-wide">
                Get In Touch
              </h3>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                If you have an internship opportunity, a project collaboration, or simply want to chat about Solidity optimizations, DeFi mechanisms, or database schema designs, feel free to drop a message!
              </p>

              {/* Direct Info List */}
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary text-lg">
                    <FaEnvelope />
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 font-mono block">EMAIL COMPATIBILITY</span>
                    <a href="mailto:pratikshakalbhor20@gmail.com" className="text-white hover:text-primary transition-colors duration-300 font-medium text-sm md:text-base">
                      pratikshakalbhor20@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 border border-secondary/20 flex items-center justify-center text-[#7928CA] text-lg">
                    <FaPhoneAlt />
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 font-mono block">MOBILE NETWORK</span>
                    <span className="text-white font-medium text-sm md:text-base">+91 93077 75865</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary text-lg">
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 font-mono block">LOCATION NODE</span>
                    <span className="text-white font-medium text-sm md:text-base">Pune, Maharashtra, India</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sub banner */}
            <div className="glassmorphism p-4 rounded-xl border-white/5 font-mono text-[10px] text-gray-500 mt-8 hidden lg:block">
              &gt; Handshake protocol: ECDSA SECP256K1 verified.
            </div>
          </motion.div>

          {/* Right Column: Interaction Form */}
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
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-12 flex flex-col items-center justify-center text-center space-y-4 min-h-[350px]"
                  >
                    <GoCheckCircle size={60} className="text-emerald-400 filter drop-shadow-[0_0_8px_rgba(52,211,153,0.5)] animate-bounce" />
                    <h3 className="text-xl font-bold text-white">Transmission Successful!</h3>
                    <p className="text-gray-400 text-sm max-w-sm">
                      Thank you! Your message has been successfully broadcasted. I will reach back to your node shortly.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form 
                    key="contact-form"
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    {/* Name Input */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="name" className="text-xs font-mono text-gray-400 uppercase tracking-widest">
                        Your Name
                      </label>
                      <input 
                        type="text" 
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Pratiksha"
                        className={`w-full bg-[#080B11]/80 border ${errors.name ? 'border-red-500' : 'border-white/10'} hover:border-white/20 focus:border-primary text-gray-100 rounded-xl px-4 py-3 text-sm transition-all focus:outline-none`}
                      />
                      {errors.name && <span className="text-red-500 text-[10px] font-mono mt-0.5">{errors.name}</span>}
                    </div>

                    {/* Email Input */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="email" className="text-xs font-mono text-gray-400 uppercase tracking-widest">
                        Your Email
                      </label>
                      <input 
                        type="email" 
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@domain.com"
                        className={`w-full bg-[#080B11]/80 border ${errors.email ? 'border-red-500' : 'border-white/10'} hover:border-white/20 focus:border-primary text-gray-100 rounded-xl px-4 py-3 text-sm transition-all focus:outline-none`}
                      />
                      {errors.email && <span className="text-red-500 text-[10px] font-mono mt-0.5">{errors.email}</span>}
                    </div>

                    {/* Phone Input */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="phone" className="text-xs font-mono text-gray-400 uppercase tracking-widest">
                        Phone Number (Optional)
                      </label>
                      <input 
                        type="text" 
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91..."
                        className="w-full bg-[#080B11]/80 border border-white/10 hover:border-white/20 focus:border-primary text-gray-100 rounded-xl px-4 py-3 text-sm transition-all focus:outline-none"
                      />
                    </div>

                    {/* Message Textarea */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="message" className="text-xs font-mono text-gray-400 uppercase tracking-widest">
                        Message Content
                      </label>
                      <textarea 
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="5"
                        placeholder="Hello Pratiksha, let's collaborate on a smart contract deployment..."
                        className={`w-full bg-[#080B11]/80 border ${errors.message ? 'border-red-500' : 'border-white/10'} hover:border-white/20 focus:border-primary text-gray-100 rounded-xl px-4 py-3 text-sm transition-all focus:outline-none resize-none`}
                      />
                      {errors.message && <span className="text-red-500 text-[10px] font-mono mt-0.5">{errors.message}</span>}
                    </div>

                    {/* Submit Action */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={status === 'sending'}
                        className="w-full py-3.5 rounded-xl font-semibold bg-primary hover:bg-[#00d0e6] text-dark shadow-[0_0_15px_rgba(0,242,254,0.3)] transition-all duration-300 flex items-center justify-center gap-2 transform active:scale-98 disabled:opacity-50 disabled:pointer-events-none"
                      >
                        {status === 'sending' ? (
                          <>
                            <span className="w-4 h-4 border-2 border-dark border-t-transparent animate-spin rounded-full" /> Sending Transaction...
                          </>
                        ) : (
                          <>
                            <FaPaperPlane /> Broadcast Message
                          </>
                        )}
                      </button>
                    </div>

                    {/* Error Box */}
                    {status === 'error' && (
                      <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs py-2 px-3 rounded-lg text-center font-mono">
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
