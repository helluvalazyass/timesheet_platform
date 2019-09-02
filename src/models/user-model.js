const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
    maxlength: 100,
    trim: true
  },
  first_name: {
    type: String,
    required: true,
    maxlength: 100,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if(!validator.isEmail(value)) {
        throw new Error('invalid email')
      }
    },
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    trim: true,
    // minlength: 6,
    validate(value) {
      if(!value.toString().match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?!.*[ ]).{8,15}$/g)) {
        throw new Error('invalid password')
      }
    }
  }
}, { timestamps: true })


const userModel = new mongoose.model('User', userSchema)

module.exports = userModel


