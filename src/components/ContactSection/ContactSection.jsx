import { useState } from 'react';
import useInView from '../../hooks/useInView';

const fieldInputCls = 'bg-bg-600 border border-border-dark text-light-100 py-[12px] px-4 text-[0.9rem] transition-[border-color_150ms_ease,box-shadow_150ms_ease] outline-none appearance-none rounded-none placeholder:text-light-600 focus:border-red focus:shadow-[0_0_0_3px_rgba(204,0,0,0.12)]';

const SPORTS = ['Cricket', 'Football', 'Basketball', 'Training', 'Other'];

const CONTACT_INFO = [
  {
    icon: '📞',
    label: 'Phone',
    lines: ['+92 334 6688701', '+92 314 7512811'],
  },
  {
    icon: '✉️',
    label: 'Email',
    lines: ['kitlab@gmail.com'],
  },
  {
    icon: '📍',
    label: 'Address',
    lines: ['Islamabad, Pakistan'],
  },
];

export default function ContactSection() {
  const [headerRef, headerVisible] = useInView();
  const [formRef, formVisible] = useInView();
  const [infoRef, infoVisible] = useInView();
  const [form, setForm] = useState({
    name: '', phone: '', email: '', sport: '', message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors(prev => ({ ...prev, [e.target.name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!form.name.trim())    newErrors.name    = 'Full name is required.';
    if (!form.email.trim())   newErrors.email   = 'Email address is required.';
    if (!form.message.trim()) newErrors.message = 'Message cannot be empty.';
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setForm({ name: '', phone: '', email: '', sport: '', message: '' });
    setErrors({});
  };

  return (
    <section className="bg-bg-700 py-24" id="contact">
      <div className="container">
        <div
          className={`flex flex-col items-start gap-4 mb-12 anim-fade-up${headerVisible ? ' is-visible' : ''}`}
          ref={headerRef}
        >
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">
            Fill in the form and we'll get back to you shortly
          </p>
        </div>

        <div className="grid grid-cols-[1.4fr_1fr] gap-12 items-start max-[900px]:grid-cols-1">
          {/* Form */}
          <form
            className={`flex flex-col gap-5 anim-fade-left${formVisible ? ' is-visible' : ''}`}
            onSubmit={handleSubmit} noValidate ref={formRef}
          >
            <div className="grid grid-cols-2 gap-5 max-[900px]:grid-cols-1">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-[11px] font-bold tracking-[1.5px] uppercase text-light-500">
                  Full Name <span aria-hidden="true" className="text-red">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your full name"
                  value={form.name}
                  onChange={handleChange}
                  className={fieldInputCls}
                />
                {errors.name && <span className="text-[0.78rem] text-[#ff5555] mt-1 block">{errors.name}</span>}
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-[11px] font-bold tracking-[1.5px] uppercase text-light-500">
                  Email Address <span aria-hidden="true" className="text-red">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={handleChange}
                  className={fieldInputCls}
                />
                {errors.email && <span className="text-[0.78rem] text-[#ff5555] mt-1 block">{errors.email}</span>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5 max-[900px]:grid-cols-1">
              <div className="flex flex-col gap-2">
                <label htmlFor="phone" className="text-[11px] font-bold tracking-[1.5px] uppercase text-light-500">Phone Number</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+92 000 0000000"
                  value={form.phone}
                  onChange={handleChange}
                  className={fieldInputCls}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="sport" className="text-[11px] font-bold tracking-[1.5px] uppercase text-light-500">Sport Type</label>
                <select
                  id="sport"
                  name="sport"
                  value={form.sport}
                  onChange={handleChange}
                  className={`${fieldInputCls} cursor-pointer bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20width=%2712%27%20height=%278%27%20viewBox=%270%200%2012%208%27%3E%3Cpath%20d=%27M1%201l5%205%205-5%27%20stroke=%27%23888%27%20stroke-width=%271.5%27%20fill=%27none%27/%3E%3C/svg%3E')] bg-no-repeat [background-position:right_16px_center] pr-[40px] [&>option]:bg-bg-600 [&>option]:text-light-100`}
                >
                  <option value="">Select your sport</option>
                  {SPORTS.map(s => (
                    <option key={s} value={s.toLowerCase()}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-[11px] font-bold tracking-[1.5px] uppercase text-light-500">
                Message <span aria-hidden="true" className="text-red">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Tell us about your requirements..."
                value={form.message}
                onChange={handleChange}
                className={`${fieldInputCls} resize-y min-h-[120px]`}
              />
              {errors.message && <span className="text-[0.78rem] text-[#ff5555] mt-1 block">{errors.message}</span>}
            </div>

            <button type="submit" className="btn btn-red w-fit py-[14px] px-10 bg-[#a00000] hover:bg-[#880000]">
              {submitted ? '✓ Message Sent!' : 'Send Message'}
            </button>

            {submitted && (
              <p className="text-[0.875rem] text-[#4caf50] font-semibold">
                Thanks! We'll get back to you within 24 hours.
              </p>
            )}
          </form>

          {/* Info */}
          <div
            className={`flex flex-col gap-5 anim-fade-right${infoVisible ? ' is-visible' : ''}`}
            ref={infoRef}
          >
            {CONTACT_INFO.map(({ icon, label, lines }) => (
              <div key={label} className="flex items-start gap-4 bg-bg-600 border border-border-dark p-5">
                <span className="text-[1.4rem] flex-shrink-0 mt-[2px]">{icon}</span>
                <div>
                  <strong className="block text-[11px] font-bold tracking-[1.5px] uppercase text-gold mb-2">{label}</strong>
                  {lines.map((line, i) => (
                    <p key={i} className="text-[0.875rem] text-light-400 leading-[1.65]">{line}</p>
                  ))}
                </div>
              </div>
            ))}

            <a
              href="https://wa.me/923346688701"
              target="_blank"
              rel="noopener noreferrer"
              className="btn w-full justify-center py-[14px] text-[13px] bg-[#0d5c2e] text-light-100 hover:bg-[#0a4422]"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
