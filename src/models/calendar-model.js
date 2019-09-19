const mongoose = require('mongoose')

const calendarSchema = new mongoose.Schema({
  date: {
    type: Date
  },
  isHoliday: {
    type: Boolean
  },
  isWeekend: {
    type: Boolean
  },
  timesheet: [{
    project_id: {
      type: mongoose.Types.ObjectId,
      ref: 'Project'
    },
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: 'User'
    },
    ts_id: {
      type: mongoose.Types.ObjectId,
      ref: 'Timesheet'
    }
  }]
}, {timestamps: true})

const calendarModel = new mongoose.model('Calendar', calendarSchema)



module.exports = calendarModel