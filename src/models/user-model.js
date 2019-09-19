'use strict';
const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
    maxlength: 100,
    trim: true
  },
  last_name: {
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
    trim: true
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }],
  managingProjects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  }],
  workingProjects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  }],
  isActive: {
    default: true,
    type: Boolean
  },
  timesheet: [{
    project_id: {
      type: mongoose.Types.ObjectId,
      ref: 'Project'
    },
    date: {
      type: Date
    },
    ts_id: {
      type: mongoose.Types.ObjectId,
      ref: 'Timesheet'
    }
  }]
}, { timestamps: true })

userSchema.statics.getMemberIdsByEmails = (emails) => {
  const query = User.find({
    'email': {
      $in: emails
    }
  },
  '_id'
  // (error, ids) => {
  //   if(error){
  //     throw new Error(error)
  //   }
  //   console.log(ids)
  //   return ids.map((id) => {
  //     id._id
  //   })
  // }
  )
  return query.exec()
}


userSchema.pre('save', async function(next) {
  
  try {
    const user = this
    // console.log(this)
    if(user.isModified('password')) {
    const minlength = 6;
    if(!(user.password.length >= 6 || user.password.toString().match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?!.*[ ]).{8,15}$/g))) {
      throw new Error('invalid password')
    }

      user.password = await bcrypt.hash(user.password, 8)
    }
  } catch(e) {
    console.log(e)
  }
  finally {
    next()
  }
})

userSchema.statics.searchByCredentials = async (email, password) => {
  const user = await User.findOne({ email })
  // console.log(user)
  if(!user) {
    return { error : 'user not found'}
  }
  // console.log(user)
  const isMatch = await bcrypt.compare(password, user.password)
  // 
  if(!isMatch) {
    // throw new Error('email or password do not match')
    return { error: 'email or password do not match' }
  }
  return { user }
}

userSchema.methods.generateAuthToken = async function () {
  const user = this
  const token = jwt.sign({ _id: user._id }, 'thisissecretkey', { expiresIn: '1 day' } )
  // console.log(token)
  user.tokens = user.tokens.concat({ token })
  await user.save()
  // console.log(user)
  return token
}

const User = new mongoose.model('User', userSchema)


module.exports = User


