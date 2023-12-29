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
  img: String,

  a1 : {
    type : Boolean,
    default : false
  },
  a2 : {
    type : Boolean,
    default : false
  },
  b1 : {
    type : Boolean,
    default : false
  },
  b2 : {
    type : Boolean,
    default : false
  },
  c1 : {
    type : Boolean,
    default : false
  },
  c2 : {
    type : Boolean,
    default : false
  },
  d1 : {
    type : Boolean,
    default : false
  },
  d2 : {
    type : Boolean,
    default : false
  },
  e1 : {
    type : Boolean,
    default : false
  },
   e2: {
    type : Boolean,
    default : false
  },
  f1 : {
    type : Boolean,
    default : false
  },
  f2 : {
    type : Boolean,
    default : false
  },
  g1 : {
    type : Boolean,
    default : false
  },
  g2 : {
    type : Boolean,
    default : false
  }
});

const Hospital = mongoose.model('Hospital', hospitalSchema);

module.exports = Hospital;
