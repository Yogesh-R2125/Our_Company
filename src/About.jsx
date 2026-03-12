import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AnimateOnScroll } from './components/AnimateOnScroll';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const About = () => {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/team`)
      .then(r => r.json())
      .then(data => setTeam(data))
      .catch(() => {});
  }, []);

  const fallbackTeam = [
    { id: 1, name: 'Member 1', role: 'Full Stack Developer & Co-Founder', bio: 'Passionate full-stack developer with expertise in React, Node.js, and cloud technologies.' },
    { id: 2, name: 'Member 2', role: 'UI/UX Designer & Co-Founder', bio: 'Creative designer focused on crafting beautiful and intuitive user experiences.' },
    { id: 3, name: 'Member 3', role: 'Backend Developer & Co-Founder', bio: 'Expert in scalable server-side applications, database architecture, and API design.' },
    { id: 4, name: 'Member 4', role: 'Mobile Developer & Co-Founder', bio: 'Skilled mobile developer building high-performance cross-platform apps.' },
  ];

  const teamData = team.length > 0 ? team : fallbackTeam;

  const values = [
    { icon: '🎯', title: 'Client First', desc: 'Every decision we make starts with the client\'s needs and goals in mind.' },
    { icon: '💡', title: 'Innovation', desc: 'We embrace new technologies and creative approaches to solve complex problems.' },
    { icon: '🤝', title: 'Collaboration', desc: 'We work closely with our clients as partners, not just service providers.' },
    { icon: '📐', title: 'Quality', desc: 'We never compromise on code quality, design standards, or user experience.' },
    { icon: '⏱️', title: 'Reliability', desc: 'We deliver on time, every time. Our word is our bond.' },
    { icon: '🌱', title: 'Growth', desc: 'We are always learning, improving, and pushing boundaries.' },
  ];

  return (
    <div className="about-page">
      {/* Hero */}
      <section className="page-hero">
        <div className="hero-bg-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
        </div>
        <div className="container">
          <span className="section-tag">About Us</span>
          <h1>We Are <span className="gradient-text">WolfStack</span></h1>
          <p className="hero-subtitle">
            Four passionate minds, one shared vision — delivering exceptional digital experiences
            that help businesses thrive in the modern world.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="section story-section">
        <div className="container">
          <div className="story-grid">
            <AnimateOnScroll animation="fade-right">
            <div className="story-content">
              <span className="section-tag">Our Story</span>
              <h2>From <span className="gradient-text">Idea to Reality</span></h2>
              <p>
                WolfStack was born from a simple idea: what if a small team of dedicated
                professionals could deliver the same quality as a large agency, but with the
                personal touch and agility of a startup?
              </p>
              <p>
                We started as four friends with complementary skills — development, design,
                backend, and mobile — and a shared passion for creating digital products
                that make a real impact. Today, we're proud to serve clients across industries,
                turning their visions into reality.
              </p>
              <p>
                We believe that great products come from great teams, and that's exactly
                what we've built. Each of us brings unique expertise, and together we cover
                the full spectrum of digital product development.
              </p>
            </div>
            </AnimateOnScroll>
            <AnimateOnScroll animation="fade-left" delay={200}>
            <div className="story-milestones">
              <div className="milestone">
                <div className="milestone-year">2024</div>
                <div className="milestone-text">
                  <h4>The Beginning</h4>
                  <p>Four friends unite with a shared vision to build something meaningful.</p>
                </div>
              </div>
              <div className="milestone">
                <div className="milestone-year">2025</div>
                <div className="milestone-text">
                  <h4>First Clients</h4>
                  <p>Successfully delivered our first projects and earned client trust.</p>
                </div>
              </div>
              <div className="milestone">
                <div className="milestone-year">2026</div>
                <div className="milestone-text">
                  <h4>Growing Strong</h4>
                  <p>Expanding our services and building a reputation for quality.</p>
                </div>
              </div>
            </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section team-section">
        <div className="container">
          <AnimateOnScroll animation="fade-up">
            <div className="section-header">
              <span className="section-tag">Our Team</span>
              <h2>Meet the <span className="gradient-text">Founders</span></h2>
              <p>The talented people behind FreelanceCo</p>
            </div>
          </AnimateOnScroll>
          <div className="team-grid">
            {teamData.map((member, index) => (
              <AnimateOnScroll key={member.id} animation="scale-up" delay={index * 150}>
              <div className="team-card">
                <div className="team-avatar">
                  <span>{member.name.charAt(0)}</span>
                </div>
                <h3>{member.name}</h3>
                <span className="team-role">{member.role}</span>
                <p>{member.bio}</p>
                <div className="team-links">
                  <a href={member.linkedin || '#'} aria-label="LinkedIn">in</a>
                  <a href={member.github || '#'} aria-label="GitHub">GH</a>
                </div>
              </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section values-section">
        <div className="container">
          <AnimateOnScroll animation="fade-up">
            <div className="section-header">
              <span className="section-tag">Our Values</span>
              <h2>What <span className="gradient-text">Drives Us</span></h2>
            </div>
          </AnimateOnScroll>
          <div className="values-grid">
            {values.map((val, i) => (
              <AnimateOnScroll key={i} animation="flip-up" delay={i * 100}>
              <div className="value-card">
                <div className="value-icon">{val.icon}</div>
                <h3>{val.title}</h3>
                <p>{val.desc}</p>
              </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section cta-section">
        <div className="container">
          <AnimateOnScroll animation="zoom-in">
            <div className="cta-content">
              <h2>Want to Work With Us?</h2>
              <p>We'd love to hear about your project and see how we can help.</p>
              <Link to="/contact" className="btn btn-primary">Book a Call</Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </div>
  );
};

export default About;
