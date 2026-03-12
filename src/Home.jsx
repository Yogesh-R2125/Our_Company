import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AnimateOnScroll } from './components/AnimateOnScroll';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const Home = () => {
  const [services, setServices] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [stats, setStats] = useState({ projects: 50, team: 5, clients: 30 });

  useEffect(() => {
    fetch(`${API_URL}/services`)
      .then(r => r.json())
      .then(data => setServices(data.slice(0, 3)))
      .catch(() => {});
    fetch(`${API_URL}/testimonials`)
      .then(r => r.json())
      .then(data => setTestimonials(data))
      .catch(() => {});
    fetch(`${API_URL}/stats`)
      .then(r => r.json())
      .then(data => setStats(prev => ({ ...prev, ...data })))
      .catch(() => {});
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
        <div className="hero-content">
          <span className="hero-badge">Digital Solutions That Deliver</span>
          <h1>
            We Build <span className="gradient-text">Digital Products</span>
            <br />That Drive Growth
          </h1>
          <p className="hero-subtitle">
            By combining expertise in development, design, and strategy, we craft
            digital experiences that transform businesses and delight users.
          </p>
          <div className="hero-buttons">
            <Link to="/contact" className="btn btn-primary">Book a Call</Link>
            <Link to="/portfolio" className="btn btn-outline">View Our Work</Link>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">{stats.projects}+</span>
              <span className="stat-label">Projects Delivered</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{stats.team}</span>
              <span className="stat-label">Team Members</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{stats.clients}+</span>
              <span className="stat-label">Happy Clients</span>
            </div>
          </div>
        </div>
      </section>

      {/* About Snippet */}
      <section className="section about-snippet">
        <div className="container">
          <div className="about-snippet-grid">
            <AnimateOnScroll animation="fade-right">
              <div className="about-snippet-content">
                <span className="section-tag">Who We Are</span>
                <h2>A Young Team With <span className="gradient-text">Big Ambitions</span></h2>
                <p>
                  We are 5 co-founders united by our passion for technology and design.
                  We combine expertise in full-stack development, mobile apps, UI/UX design,
                  and cloud solutions to deliver end-to-end digital products.
                </p>
                <p>
                  Our mission is simple: build high-quality digital solutions that help
                  businesses grow while maintaining a personal touch that larger agencies can't match.
                </p>
                <Link to="/about" className="btn btn-primary">Learn More About Us</Link>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll animation="fade-left" delay={200}>
              <div className="about-snippet-visual">
                <div className="visual-card">
                  <div className="visual-card-icon">🚀</div>
                  <h4>Innovation First</h4>
                  <p>We stay ahead with cutting-edge tech</p>
                </div>
                <div className="visual-card">
                  <div className="visual-card-icon">🤝</div>
                  <h4>Client Focused</h4>
                  <p>Your success is our success</p>
                </div>
                <div className="visual-card">
                  <div className="visual-card-icon">⚡</div>
                  <h4>Fast Delivery</h4>
                  <p>Agile processes, quick turnaround</p>
                </div>
                <div className="visual-card">
                  <div className="visual-card-icon">💎</div>
                  <h4>Quality Code</h4>
                  <p>Clean, maintainable, scalable</p>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="section services-preview">
        <div className="container">
          <AnimateOnScroll animation="fade-up">
            <div className="section-header">
              <span className="section-tag">What We Do</span>
              <h2>Our <span className="gradient-text">Services</span></h2>
              <p>End-to-end digital solutions for businesses of all sizes</p>
            </div>
          </AnimateOnScroll>
          <div className="services-grid">
            {(services.length > 0 ? services : [
              { id: 1, icon: '🌐', title: 'Web Development', description: 'Modern, responsive websites and web applications using React, Node.js, and more.' },
              { id: 2, icon: '📱', title: 'Mobile Apps', description: 'Cross-platform mobile apps for iOS and Android with seamless experiences.' },
              { id: 3, icon: '🎨', title: 'UI/UX Design', description: 'Beautiful, user-centered designs that combine aesthetics with functionality.' },
            ]).map((service, i) => (
              <AnimateOnScroll key={service.id} animation="flip-up" delay={i * 150}>
                <div className="service-card">
                  <div className="service-icon">{service.icon}</div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
          <AnimateOnScroll animation="fade-up" delay={400}>
            <div className="section-cta">
              <Link to="/services" className="btn btn-outline">View All Services →</Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Process Section */}
      <section className="section process-section">
        <div className="container">
          <AnimateOnScroll animation="fade-up">
            <div className="section-header">
              <span className="section-tag">How We Work</span>
              <h2>Our <span className="gradient-text">Process</span></h2>
              <p>A proven approach that delivers results every time</p>
            </div>
          </AnimateOnScroll>
          <div className="process-timeline">
            {[
              { num: '01', title: 'Discovery', desc: 'We listen to understand your vision, goals, and requirements.' },
              { num: '02', title: 'Design', desc: 'Our designers create wireframes and prototypes for your approval.' },
              { num: '03', title: 'Development', desc: 'Our developers bring the designs to life with clean, efficient code.' },
              { num: '04', title: 'Delivery', desc: 'We test, deploy, and provide ongoing support for your product.' },
            ].map((step, i) => (
              <AnimateOnScroll key={step.num} animation="scale-up" delay={i * 150}>
                <div className="process-step">
                  <div className="step-number">{step.num}</div>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="section testimonials-section">
          <div className="container">
            <AnimateOnScroll animation="fade-up">
              <div className="section-header">
                <span className="section-tag">Testimonials</span>
                <h2>What Our <span className="gradient-text">Clients Say</span></h2>
              </div>
            </AnimateOnScroll>
            <div className="testimonials-grid">
              {testimonials.map((t, i) => (
                <AnimateOnScroll key={t.id} animation="blur-in" delay={i * 150}>
                  <div className="testimonial-card">
                    <div className="testimonial-stars">
                      {'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}
                    </div>
                    <p className="testimonial-text">"{t.message}"</p>
                    <div className="testimonial-author">
                      <div className="author-avatar">{t.client_name.charAt(0)}</div>
                      <div>
                        <strong>{t.client_name}</strong>
                        {t.company && <span>{t.company}</span>}
                      </div>
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="section cta-section">
        <div className="container">
          <AnimateOnScroll animation="zoom-in">
            <div className="cta-content">
              <h2>Ready to Build Something <span className="gradient-text">Amazing</span>?</h2>
              <p>Let's discuss your project and bring your ideas to life.</p>
              <div className="hero-buttons">
                <Link to="/contact" className="btn btn-primary">Book a Call</Link>
                <Link to="/services" className="btn btn-outline">Explore Services</Link>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </div>
  );
};

export default Home;
