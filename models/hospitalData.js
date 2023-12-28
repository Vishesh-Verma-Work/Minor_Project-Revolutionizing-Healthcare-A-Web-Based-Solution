const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true
  },
  pin: {
    type: Number,
    required: true
  },
  hospitalName: {
    type: String,
    required: true
  },
  emergencyAvailable: {
    type: String,
     enum: ['true', 'false', 'NA'] // Enumerating possible string values
  },
  hospitalPhone1: {
    type: Number,
    required: true
  },
  hospitalPhone2: Number,
  hospitalEmail1: String,
  hospitalEmail2: String,
  doctorName: {
    type: String,
    required: true
  },
  specialization: {
    type: String,
    required: true
  },
  doctorPhone: {
    type: Number,
    required: true
  },
  doctorEmail: String,
  docWorkingHour: String,
  consultingFree: {
    type: Number,
    required: true
  },
  img: String
});

const Hospital = mongoose.model('Hospital', hospitalSchema);

module.exports = Hospital;
