import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AnimateOnScroll } from './components/AnimateOnScroll';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/services`)
      .then(r => r.json())
      .then(data => setServices(data))
      .catch(() => {});
  }, []);

  const fallbackServices = [
    { id: 1, icon: '🌐', title: 'Web Development', description: 'We build modern, responsive websites and web applications using cutting-edge technologies like React, Next.js, Node.js, and more. From landing pages to complex SaaS platforms.' },
    { id: 2, icon: '📱', title: 'Mobile App Development', description: 'Native and cross-platform mobile applications for iOS and Android using React Native and Flutter that deliver seamless user experiences.' },
    { id: 3, icon: '🎨', title: 'UI/UX Design', description: 'User-centered design solutions that combine aesthetics with functionality. Wireframes, prototypes, and high-fidelity designs for exceptional experiences.' },
    { id: 4, icon: '☁️', title: 'Cloud Solutions', description: 'Scalable cloud infrastructure setup, migration, and management on AWS, Azure, and Google Cloud to keep your apps always available.' },
    { id: 5, icon: '📈', title: 'Digital Marketing', description: 'Strategic digital marketing campaigns including SEO, social media marketing, PPC advertising, and content strategy to drive growth.' },
    { id: 6, icon: '🤖', title: 'AI & Machine Learning', description: 'Intelligent solutions powered by AI and ML — from chatbots to predictive analytics — to automate processes and unlock insights.' },
  ];

  const serviceData = services.length > 0 ? services : fallbackServices;

  const techStack = [
    { category: 'Frontend', items: ['React', 'Next.js', 'Vue.js', 'TypeScript', 'Tailwind CSS'] },
    { category: 'Backend', items: ['Node.js', 'Express', 'Python', 'Django', 'REST APIs'] },
    { category: 'Mobile', items: ['React Native', 'Flutter', 'iOS', 'Android'] },
    { category: 'Database', items: ['MySQL', 'PostgreSQL', 'MongoDB', 'Firebase', 'Redis'] },
    { category: 'Cloud', items: ['AWS', 'Google Cloud', 'Azure', 'Docker', 'Kubernetes'] },
    { category: 'Tools', items: ['Git', 'Figma', 'Jira', 'VS Code', 'Postman'] },
  ];

  return (
    <div className="services-page">
      {/* Hero */}
      <section className="page-hero">
        <div className="hero-bg-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
        </div>
        <div className="container">
          <span className="section-tag">Our Services</span>
          <h1>Digital Solutions That <span className="gradient-text">Deliver Results</span></h1>
          <p className="hero-subtitle">
            From concept to deployment, we provide comprehensive digital services
            to help your business succeed in the digital age.
          </p>
        </div>
      </section>

      {/* All Services */}
      <section className="section">
        <div className="container">
          <AnimateOnScroll animation="fade-up">
            <div className="section-header">
              <span className="section-tag">What We Offer</span>
              <h2>Our <span className="gradient-text">Expertise</span></h2>
            </div>
          </AnimateOnScroll>
          <div className="services-full-grid">
            {serviceData.map((service, i) => (
              <AnimateOnScroll key={service.id} animation="flip-up" delay={i * 120}>
                <div className="service-full-card">
                  <div className="service-icon-large">{service.icon}</div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="section tech-section">
        <div className="container">
          <AnimateOnScroll animation="fade-up">
            <div className="section-header">
              <span className="section-tag">Technologies</span>
              <h2>Our <span className="gradient-text">Tech Stack</span></h2>
              <p>We use the best tools and technologies to build your products</p>
            </div>
          </AnimateOnScroll>
          <div className="tech-grid">
            {techStack.map((group, i) => (
              <AnimateOnScroll key={i} animation="fade-up" delay={i * 100}>
              <div className="tech-group">
                <h4>{group.category}</h4>
                <div className="tech-tags">
                  {group.items.map((item, j) => (
                    <span key={j} className="tech-tag">{item}</span>
                  ))}
                </div>
              </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="section pricing-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Pricing</span>
            <h2>Simple & <span className="gradient-text">Transparent</span></h2>
            <p>Choose a plan that works for your needs</p>
          </div>
          <AnimateOnScroll animation="fade-up">
          <div className="pricing-grid">
            <div className="pricing-card">
              <h3>Starter</h3>
              <div className="price">Custom Quote</div>
              <p className="pricing-desc">Perfect for small projects and MVPs</p>
              <ul className="pricing-features">
                <li>Landing Page / Portfolio</li>
                <li>Responsive Design</li>
                <li>Up to 5 Pages</li>
                <li>Basic SEO Setup</li>
                <li>1 Month Support</li>
              </ul>
              <Link to="/contact" className="btn btn-outline">Get Started</Link>
            </div>
            <div className="pricing-card featured">
              <span className="pricing-badge">Popular</span>
              <h3>Professional</h3>
              <div className="price">Custom Quote</div>
              <p className="pricing-desc">For growing businesses needing more</p>
              <ul className="pricing-features">
                <li>Full Web Application</li>
                <li>Custom UI/UX Design</li>
                <li>Backend & Database</li>
                <li>API Integration</li>
                <li>3 Months Support</li>
                <li>Performance Optimization</li>
              </ul>
              <Link to="/contact" className="btn btn-primary">Get Started</Link>
            </div>
            <div className="pricing-card">
              <h3>Enterprise</h3>
              <div className="price">Custom Quote</div>
              <p className="pricing-desc">Complete digital transformation</p>
              <ul className="pricing-features">
                <li>Everything in Professional</li>
                <li>Mobile App Development</li>
                <li>Cloud Infrastructure</li>
                <li>AI/ML Integration</li>
                <li>6 Months Support</li>
                <li>Dedicated Project Manager</li>
              </ul>
              <Link to="/contact" className="btn btn-outline">Get Started</Link>
            </div>
          </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* CTA */}
      <section className="section cta-section">
        <div className="container">
          <AnimateOnScroll animation="zoom-in">
            <div className="cta-content">
              <h2>Have a Project in Mind?</h2>
              <p>Let's discuss how we can help turn your idea into reality.</p>
              <Link to="/contact" className="btn btn-primary">Book a Call</Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </div>
  );
};

export default Services;
