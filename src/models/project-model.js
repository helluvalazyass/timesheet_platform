'use strict';
const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxlength: 100,
  },
  phases: [{
    name: {
      type: String,
      trim: true,
      required: true
    },
    sequence: {
      type: Number,
      required: true
    }
  }],
  members: [{
    type: mongoose.Types.ObjectId,
    ref: 'User'
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  timesheet: [{
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: 'User'
    },
    date: {
      type: Date
    },
    ts_id: {
      type: mongoose.Types.ObjectId,
      ref: 'Timesheet'
    }
  }],
  manager_id: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  }
})

const projectModel = new mongoose.model('Project', projectSchema)

const pro = new projectModel({
  name: 'Project1',
  phases: [{
    name: 'Phase1',
    sequence: 1
  },{
    name: 'Phase3',
    sequence: 2
  }]
})

// pro.save().then(()=> {
//   console.log('saved!')
// }).catch((e) => {
//   console.log(e)
// })

module.exports = projectModel;