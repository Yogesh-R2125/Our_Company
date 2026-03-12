-- FreelanceCo Database Schema
-- Run this file in MySQL to set up the database

CREATE DATABASE IF NOT EXISTS freelance_company;
USE freelance_company;

-- Services table
CREATE TABLE IF NOT EXISTS services (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  description TEXT,
  icon VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Team members table
CREATE TABLE IF NOT EXISTS team_members (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  role VARCHAR(100),
  bio TEXT,
  image_url VARCHAR(255),
  linkedin VARCHAR(255),
  github VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Projects / Portfolio table
CREATE TABLE IF NOT EXISTS projects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  description TEXT,
  category VARCHAR(50),
  image_url VARCHAR(255),
  tech_stack VARCHAR(255),
  live_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Contact form submissions
CREATE TABLE IF NOT EXISTS contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  subject VARCHAR(200),
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Testimonials
CREATE TABLE IF NOT EXISTS testimonials (
  id INT AUTO_INCREMENT PRIMARY KEY,
  client_name VARCHAR(100) NOT NULL,
  company VARCHAR(100),
  message TEXT,
  rating INT DEFAULT 5,
  image_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Newsletter subscribers
CREATE TABLE IF NOT EXISTS newsletter (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(100) NOT NULL UNIQUE,
  subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================
-- SEED DATA
-- =====================

INSERT INTO services (title, description, icon) VALUES
('Web Development', 'We build modern, responsive websites and web applications using cutting-edge technologies like React, Next.js, Node.js, and more. From landing pages to complex SaaS platforms.', '🌐'),
('Mobile App Development', 'Native and cross-platform mobile applications for iOS and Android using React Native and Flutter that deliver seamless user experiences.', '📱'),
('UI/UX Design', 'User-centered design solutions that combine aesthetics with functionality. Wireframes, prototypes, and high-fidelity designs for exceptional experiences.', '🎨'),
('Cloud Solutions', 'Scalable cloud infrastructure setup, migration, and management on AWS, Azure, and Google Cloud to keep your apps always available.', '☁️'),
('Digital Marketing', 'Strategic digital marketing campaigns including SEO, social media marketing, PPC advertising, and content strategy to drive growth.', '📈'),
('AI & Machine Learning', 'Intelligent solutions powered by AI and ML — from chatbots to predictive analytics — to automate processes and unlock insights.', '🤖');

INSERT INTO team_members (name, role, bio, linkedin, github) VALUES
('Member 1', 'Full Stack Developer & Co-Founder', 'Passionate full-stack developer with expertise in React, Node.js, and cloud technologies. Loves building scalable solutions.', '#', '#'),
('Member 2', 'UI/UX Designer & Co-Founder', 'Creative designer focused on crafting beautiful and intuitive user experiences that delight users and drive engagement.', '#', '#'),
('Member 3', 'Backend Developer & Co-Founder', 'Expert in building scalable server-side applications, database architecture, and API design with Node.js and Python.', '#', '#'),
('Member 4', 'Mobile Developer & Co-Founder', 'Skilled mobile developer building high-performance cross-platform apps with React Native and Flutter.', '#', '#');

INSERT INTO projects (title, description, category, tech_stack) VALUES
('E-Commerce Platform', 'A full-featured online shopping platform with payment integration, inventory management, and analytics dashboard.', 'Web Development', 'React, Node.js, MongoDB, Stripe'),
('Fitness Tracker App', 'Cross-platform mobile app for tracking workouts, nutrition, and health metrics with AI-powered recommendations.', 'Mobile App', 'React Native, Firebase, TensorFlow'),
('Restaurant Management', 'Complete restaurant management system with online ordering, table reservations, and kitchen display system.', 'Web Development', 'Next.js, PostgreSQL, Socket.io'),
('Real Estate Portal', 'Property listing portal with virtual tours, map integration, and advanced search filters for buyers and sellers.', 'Web Development', 'React, Express, MySQL, Google Maps'),
('Healthcare Dashboard', 'Medical analytics dashboard for hospitals with patient management, appointment scheduling, and reporting.', 'UI/UX Design', 'Figma, React, D3.js, Node.js'),
('Social Media Analytics', 'AI-powered social media analytics tool providing insights, sentiment analysis, and automated reporting.', 'AI & ML', 'Python, React, TensorFlow, AWS');

INSERT INTO testimonials (client_name, company, message, rating) VALUES
('Rajesh Kumar', 'TechStart India', 'Outstanding work! The team delivered our e-commerce platform ahead of schedule with exceptional quality. Highly recommended!', 5),
('Sarah Johnson', 'Digital Solutions Co.', 'Their UI/UX design transformed our application. User engagement increased by 200% after the redesign. Truly talented team.', 5),
('Amit Patel', 'GrowFast Startup', 'Professional, reliable, and incredibly talented. They built our mobile app exactly as we envisioned it. Will work with them again!', 5);
