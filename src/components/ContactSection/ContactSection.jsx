import { useState } from 'react';
import useInView from '../../hooks/useInView';
import './ContactSection.css';

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
    <section className="contact" id="contact">
      <div className="container">
        <div className={`contact__header anim-fade-up${headerVisible ? ' is-visible' : ''}`} ref={headerRef}>
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">
            Fill in the form and we'll get back to you shortly
          </p>
        </div>

        <div className="contact__grid">
          {/* Form */}
          <form className={`contact__form anim-fade-left${formVisible ? ' is-visible' : ''}`} onSubmit={handleSubmit} noValidate ref={formRef}>
            <div className="contact__row">
              <div className="contact__field">
                <label htmlFor="name">Full Name <span aria-hidden="true">*</span></label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your full name"
                  value={form.name}
                  onChange={handleChange}
                />
                {errors.name && <span className="contact__error">{errors.name}</span>}
              </div>
              <div className="contact__field">
                <label htmlFor="email">Email Address <span aria-hidden="true">*</span></label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={handleChange}
                />
                {errors.email && <span className="contact__error">{errors.email}</span>}
              </div>
            </div>

            <div className="contact__row">
              <div className="contact__field">
                <label htmlFor="phone">Phone Number</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+92 000 0000000"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="contact__field">
                <label htmlFor="sport">Sport Type</label>
                <select
                  id="sport"
                  name="sport"
                  value={form.sport}
                  onChange={handleChange}
                >
                  <option value="">Select your sport</option>
                  {SPORTS.map(s => (
                    <option key={s} value={s.toLowerCase()}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="contact__field">
              <label htmlFor="message">Message <span aria-hidden="true">*</span></label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Tell us about your requirements..."
                value={form.message}
                onChange={handleChange}
              />
              {errors.message && <span className="contact__error">{errors.message}</span>}
            </div>

            <button type="submit" className="btn btn-red contact__submit">
              {submitted ? '✓ Message Sent!' : 'Send Message'}
            </button>

            {submitted && (
              <p className="contact__success">
                Thanks! We'll get back to you within 24 hours.
              </p>
            )}
          </form>

          {/* Info */}
          <div className={`contact__info anim-fade-right${infoVisible ? ' is-visible' : ''}`} ref={infoRef}>
            {CONTACT_INFO.map(({ icon, label, lines }) => (
              <div key={label} className="contact__info-card">
                <span className="contact__info-icon">{icon}</span>
                <div>
                  <strong>{label}</strong>
                  {lines.map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </div>
            ))}

            <a
              href="https://wa.me/923346688701"
              target="_blank"
              rel="noopener noreferrer"
              className="btn contact__whatsapp"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
