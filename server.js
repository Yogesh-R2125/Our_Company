// server.js — FreelanceCo Backend
import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import nodemailer from 'nodemailer';

// Ethereal Email — free demo SMTP (emails are captured, not delivered)
// View sent emails at https://ethereal.email/login with credentials below
const ETHEREAL_USER = 'flxc7swxt43h6scc@ethereal.email';
const ETHEREAL_PASS = 'hfBUJFHGKtsYr5QutK';

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  secure: false,
  auth: {
    user: ETHEREAL_USER,
    pass: ETHEREAL_PASS,
  },
});

console.log('=== Ethereal Demo Email ===');
console.log('Inbox: https://ethereal.email/login');
console.log('User:', ETHEREAL_USER);
console.log('Pass:', ETHEREAL_PASS);
console.log('===========================');

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection pool (better than single connection)
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'yogi123',           // Update with your MySQL password
  database: 'freelance_company',
  waitForConnections: true,
  connectionLimit: 10,
});

// Test DB connection
db.getConnection((err, connection) => {
  if (err) {
    console.error('Database connection failed:', err.message);
  } else {
    console.log('Connected to MySQL database');
    connection.release();
  }
});

// ============ SERVICES API ============
app.get('/api/services', (req, res) => {
  db.query('SELECT * FROM services ORDER BY id ASC', (err, results) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch services' });
    res.json(results);
  });
});

// ============ TEAM API ============
app.get('/api/team', (req, res) => {
  db.query('SELECT * FROM team_members ORDER BY id ASC', (err, results) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch team members' });
    res.json(results);
  });
});

// ============ PROJECTS / PORTFOLIO API ============
app.get('/api/projects', (req, res) => {
  const { category } = req.query;
  let query = 'SELECT * FROM projects ORDER BY created_at DESC';
  const params = [];

  if (category && category !== 'All') {
    query = 'SELECT * FROM projects WHERE category = ? ORDER BY created_at DESC';
    params.push(category);
  }

  db.query(query, params, (err, results) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch projects' });
    res.json(results);
  });
});

// ============ TESTIMONIALS API ============
app.get('/api/testimonials', (req, res) => {
  db.query('SELECT * FROM testimonials ORDER BY id DESC', (err, results) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch testimonials' });
    res.json(results);
  });
});

// ============ CONTACT FORM API ============
app.post('/api/contact', (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email and message are required' });
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  const query = 'INSERT INTO contacts (name, email, phone, subject, message) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [name, email, phone || null, subject || null, message], async (err, result) => {
    if (err) return res.status(500).json({ error: 'Failed to submit contact form' });

    // Send email notification to admin (Ethereal demo — check preview URL)
    try {
      const info = await transporter.sendMail({
        from: '"FreelanceCo" <noreply@freelanceco.com>',
        to: 'admin@freelanceco.com',
        subject: `New Enquiry: ${subject || '(No subject)'}`,
        html: `
          <h2>New Contact Enquiry</h2>
          <table style="border-collapse:collapse;width:100%;max-width:600px;">
            <tr><td style="padding:8px;font-weight:bold;">Name</td><td style="padding:8px;">${name}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;">Email</td><td style="padding:8px;">${email}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;">Phone</td><td style="padding:8px;">${phone || 'N/A'}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;">Subject</td><td style="padding:8px;">${subject || 'N/A'}</td></tr>
          </table>
          <h3 style="margin-top:16px;">Message</h3>
          <p style="white-space:pre-wrap;">${message}</p>
        `,
      });
      console.log('Email sent! Preview:', nodemailer.getTestMessageUrl(info));
    } catch (mailErr) {
      console.error('Failed to send email:', mailErr.message);
    }

    res.status(201).json({ success: true, message: 'Thank you! We will get back to you soon.' });
  });
});

// ============ NEWSLETTER API ============
app.post('/api/newsletter', (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  const query = 'INSERT INTO newsletter (email) VALUES (?)';
  db.query(query, [email], (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ error: 'This email is already subscribed' });
      }
      return res.status(500).json({ error: 'Failed to subscribe' });
    }
    res.status(201).json({ success: true, message: 'Successfully subscribed to newsletter!' });
  });
});

// ============ STATS API ============
app.get('/api/stats', (req, res) => {
  const stats = {};
  db.query('SELECT COUNT(*) as count FROM projects', (err, r1) => {
    stats.projects = r1 ? r1[0].count : 0;
    db.query('SELECT COUNT(*) as count FROM team_members', (err2, r2) => {
      stats.team = r2 ? r2[0].count : 0;
      db.query('SELECT COUNT(*) as count FROM contacts', (err3, r3) => {
        stats.clients = r3 ? r3[0].count : 0;
        res.json(stats);
      });
    });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
