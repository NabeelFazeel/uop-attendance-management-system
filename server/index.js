// load environment variables from .env file if present
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// load models (will create below)
const Student = require('./models/Student');
const Attendance = require('./models/Attendance');

const app = express();
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

// passport / Google OAuth configuration
if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  console.warn('Google OAuth environment variables missing; /auth/google routes will not work');
} else {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      const email = profile.emails && profile.emails[0] && profile.emails[0].value;
      if (!email) return done(new Error('No email in Google profile'));
      let student = await Student.findOne({ email });
      if (!student) {
        student = await Student.create({
          email,
          studentId: profile.id, // in a real app you'd generate or map properly
        });
      }
      return done(null, student);
    } catch (err) {
      return done(err);
    }
  }));

  // authentication routes
  app.get('/auth/google', passport.authenticate('google', { scope: ['email'] }));
  app.get(
    '/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/?error=auth' }),
    (req, res) => {
      const student = req.user;
      res.redirect(`/login/success?studentId=${student._id}`);
    }
  );
}

// connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI || 'mongodb://localhost:27017/attendance')
  .then(() => console.log('🗄  MongoDB connected'))
  .catch((err) => console.error('Mongo connection error', err));

// --- routes ---

// 1. login: accept email or student id and return student profile
app.post('/api/login', async (req, res) => {
  const { identifier } = req.body; // email or studentId
  // TODO: look up student and return basic info
  try {
    const student = await Student.findOne({
      $or: [{ email: identifier }, { studentId: identifier }],
    });
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json({ studentId: student._id, email: student.email });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. device verification (webauthn/photo stub)
app.post('/api/verify-device', (req, res) => {
  // The payload will contain studentId, method and any credential data
  // TODO: implement WebAuthn / photo verification logic
  res.json({ success: true, method: req.body.method });
});

// 3. lecture code & geofencing
app.post('/api/verify-lecture', (req, res) => {
  const { lectureCode, lat, lng } = req.body;
  // TODO: check code validity and location
  const valid = true; // placeholder
  const inside = true; // placeholder
  if (!valid) return res.status(400).json({ error: 'Invalid code' });
  if (!inside) return res.status(400).json({ error: 'Out of bounds' });
  res.json({ success: true });
});

// 4. record attendance
app.post('/api/record-attendance', async (req, res) => {
  const { studentId, lectureCode, method, lat, lng } = req.body;
  try {
    const attendance = new Attendance({
      student: studentId,
      lectureCode,
      method,
      location: { lat, lng },
    });
    await attendance.save();
    res.json({ success: true, attendance });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server listening on ${PORT}`));
