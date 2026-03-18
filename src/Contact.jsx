import React, { useState } from 'react';
import { AnimateOnScroll } from './components/AnimateOnScroll';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');

    try {
      const res = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        setStatus(data.error || 'Something went wrong');
      }
    } catch {
      setStatus('Failed to submit. Please try again later.');
    }
    setLoading(false);
  };

  const contactInfo = [
    { icon: '📍', title: 'Address', value: 'Coimbatore, India' },
    { icon: '📧', title: 'Email', value: 'wolfstackstudios@gmail.com' },
    { icon: '📞', title: 'Phone', value: '+91 90800 61923' },
    { icon: '🕐', title: 'Working Hours', value: 'Mon - Sat, 9 AM - 7 PM IST' },
  ];

  return (
    <div className="contact-page">
      {/* Hero */}
      <section className="page-hero">
        <div className="hero-bg-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
        </div>
        <div className="container">
          <span className="section-tag">Contact Us</span>
          <h1>Let's <span className="gradient-text">Talk</span></h1>
          <p className="hero-subtitle">
            Have a project in mind? Want to discuss an idea?
            We'd love to hear from you. Drop us a message and we'll get back to you quickly.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section">
        <div className="container">
          <div className="contact-grid">
            {/* Contact Info */}
            <AnimateOnScroll animation="fade-right">
            <div className="contact-info">
              <h2>Get in <span className="gradient-text">Touch</span></h2>
              <p>Fill out the form and our team will get back to you within 24 hours.</p>

              <div className="contact-details">
                {contactInfo.map((info, i) => (
                  <div key={i} className="contact-item">
                    <div className="contact-item-icon">{info.icon}</div>
                    <div>
                      <strong>{info.title}</strong>
                      <p>{info.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="contact-social">
                <h4>Follow Us</h4>
                <div className="social-links">
                  <a href="#" className="social-icon" aria-label="LinkedIn">in</a>
                  <a href="#" className="social-icon" aria-label="GitHub">GH</a>
                  <a href="#" className="social-icon" aria-label="Twitter">X</a>
                  <a href="#" className="social-icon" aria-label="Instagram">IG</a>
                </div>
              </div>
            </div>
            </AnimateOnScroll>

            {/* Contact Form */}
            <AnimateOnScroll animation="fade-left" delay={200}>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text" id="name" name="name"
                    value={form.name} onChange={handleChange}
                    placeholder="Your full name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email" id="email" name="email"
                    value={form.email} onChange={handleChange}
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="tel" id="phone" name="phone"
                    value={form.phone} onChange={handleChange}
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text" id="subject" name="subject"
                    value={form.subject} onChange={handleChange}
                    placeholder="How can we help?"
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message" name="message"
                  value={form.message} onChange={handleChange}
                  placeholder="Tell us about your project..."
                  rows="6" required
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
                {loading ? 'Sending...' : 'Send Message'}
              </button>

              {status === 'success' && (
                <div className="form-success">
                  Thank you! Your message has been sent. We'll get back to you soon.
                </div>
              )}
              {status && status !== 'success' && (
                <div className="form-error">{status}</div>
              )}
            </form>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section faq-section">
        <div className="container">
          <AnimateOnScroll animation="fade-up">
            <div className="section-header">
              <span className="section-tag">FAQ</span>
              <h2>Frequently Asked <span className="gradient-text">Questions</span></h2>
            </div>
          </AnimateOnScroll>
          <div className="faq-grid">
            <AnimateOnScroll animation="blur-in" delay={0}>
            <div className="faq-item">
              <h4>How long does a typical project take?</h4>
              <p>Project timelines vary based on complexity. A simple website takes 2-4 weeks, while complex applications may take 2-3 months.</p>
            </div>
            </AnimateOnScroll>
            <AnimateOnScroll animation="blur-in" delay={100}>
            <div className="faq-item">
              <h4>What is your development process?</h4>
              <p>We follow an agile process: Discovery, Design, Development, Testing, and Deployment with regular updates throughout.</p>
            </div>
            </AnimateOnScroll>
            <AnimateOnScroll animation="blur-in" delay={200}>
            <div className="faq-item">
              <h4>Do you provide post-launch support?</h4>
              <p>Yes! All our packages include post-launch support. We also offer extended maintenance plans.</p>
            </div>
            </AnimateOnScroll>
            <AnimateOnScroll animation="blur-in" delay={300}>
            <div className="faq-item">
              <h4>Can you work with our existing team?</h4>
              <p>Absolutely! We can integrate with your team as additional developers, designers, or consultants.</p>
            </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
