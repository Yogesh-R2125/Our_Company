import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AnimateOnScroll } from './components/AnimateOnScroll';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = ['All', 'Web Development', 'Mobile App', 'UI/UX Design', 'AI & ML'];

  useEffect(() => {
    fetchProjects();
  }, [activeFilter]);

  const fetchProjects = () => {
    const url = activeFilter === 'All'
      ? `${API_URL}/projects`
      : `${API_URL}/projects?category=${encodeURIComponent(activeFilter)}`;
    fetch(url)
      .then(r => r.json())
      .then(data => setProjects(data))
      .catch(() => {});
  };

  const fallbackProjects = [
    { id: 1, title: 'E-Commerce Platform', description: 'A full-featured online shopping platform with payments and analytics.', category: 'Web Development', tech_stack: 'React, Node.js, MongoDB, Stripe' },
    { id: 2, title: 'Fitness Tracker App', description: 'Cross-platform mobile app for tracking workouts and nutrition.', category: 'Mobile App', tech_stack: 'React Native, Firebase, TensorFlow' },
    { id: 3, title: 'Restaurant Management', description: 'Complete restaurant system with online ordering and kitchen display.', category: 'Web Development', tech_stack: 'Next.js, PostgreSQL, Socket.io' },
    { id: 4, title: 'Real Estate Portal', description: 'Property listing portal with virtual tours and map integration.', category: 'Web Development', tech_stack: 'React, Express, MySQL, Google Maps' },
    { id: 5, title: 'Healthcare Dashboard', description: 'Medical analytics dashboard for hospitals with patient management.', category: 'UI/UX Design', tech_stack: 'Figma, React, D3.js, Node.js' },
    { id: 6, title: 'Social Media Analytics', description: 'AI-powered social media analytics tool with sentiment analysis.', category: 'AI & ML', tech_stack: 'Python, React, TensorFlow, AWS' },
  ];

  const displayProjects = projects.length > 0 ? projects : (
    activeFilter === 'All'
      ? fallbackProjects
      : fallbackProjects.filter(p => p.category === activeFilter)
  );

  return (
    <div className="portfolio-page">
      {/* Hero */}
      <section className="page-hero">
        <div className="hero-bg-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
        </div>
        <div className="container">
          <span className="section-tag">Our Work</span>
          <h1>Projects That <span className="gradient-text">Speak for Themselves</span></h1>
          <p className="hero-subtitle">
            Take a look at some of the projects we've delivered.
            Each one tells a story of innovation, quality, and dedication.
          </p>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="section">
        <div className="container">
          <div className="portfolio-filters">
            {categories.map(cat => (
              <button
                key={cat}
                className={`filter-btn ${activeFilter === cat ? 'active' : ''}`}
                onClick={() => setActiveFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="portfolio-grid">
            {displayProjects.map((project, i) => (
              <AnimateOnScroll key={project.id} animation="scale-up" delay={i * 120}>
              <div className="portfolio-card">
                <div className="portfolio-card-image">
                  <div className="portfolio-placeholder">
                    <span>{project.title.charAt(0)}</span>
                  </div>
                  <div className="portfolio-overlay">
                    <span className="portfolio-category">{project.category}</span>
                  </div>
                </div>
                <div className="portfolio-card-content">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="portfolio-tech">
                    {project.tech_stack && project.tech_stack.split(',').map((tech, i) => (
                      <span key={i} className="tech-tag">{tech.trim()}</span>
                    ))}
                  </div>
                </div>
              </div>
              </AnimateOnScroll>
            ))}
          </div>
          {displayProjects.length === 0 && (
            <div className="no-results">
              <p>No projects found in this category yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section cta-section">
        <div className="container">
          <AnimateOnScroll animation="zoom-in">
            <div className="cta-content">
              <h2>Want Your Project <span className="gradient-text">Here</span>?</h2>
              <p>Let's build something amazing together.</p>
              <Link to="/contact" className="btn btn-primary">Book a Call</Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
