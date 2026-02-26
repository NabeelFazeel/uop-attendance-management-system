const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  studentId: { type: String, required: true, unique: true },
  webAuthnCredentials: { type: Array, default: [] },
  photoHash: { type: String },
  // other fields (name, course, etc.)
});

module.exports = mongoose.model('Student', studentSchema);
