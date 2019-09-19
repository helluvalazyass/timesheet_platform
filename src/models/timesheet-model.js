const mongoose = require('mongoose')

const timesheetSchema = new mongoose.Schema({
  project_id: {
    type: mongoose.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  phase: {
    type: String,
    required: true
  },
  hours: {
    type: Number,
    required: true,
    default: 0
  },
  user_id: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true,
    min: new Date(Date.now() - 30*24*3600000),
    max: new Date(Date.now() + 30*24*3600000)
  },
  status: {
    type: String,
    required: true,
    default: 'draft',
    enum: ['draft', 'submitted', 'approved', 'rejected']
  }
},  { timestamps: true })

const timesheetModel = new mongoose.model('Timesheet', timesheetSchema)

const ts = new timesheetModel({
  project_id: mongoose.Types.ObjectId('1d7f6ca22c629941d3300524'),
  phase: 'Phase1',
  hours: 5,
  user_id: mongoose.Types.ObjectId('5d6e781cc45e403e5fd14a86'),
  date: new Date(),
})

ts.save()
module.exports = timesheetModel