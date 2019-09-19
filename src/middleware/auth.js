'use strict';


const User = require('../models/user-model')
const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
  // res.status(200).send({ user, token })
  try {
    const token = req.header('Authorization').replace('Bearer ', '')
    // console.log(req.header('Authorization'))
    const decoded = jwt.verify(token, 'thisissecretkey')
    const _id = decoded._id
    console.log(_id)
    const user = await User.findOne({ _id, 'tokens.token': token })
    if(!user) {
      throw new Error("user not found")
    }
    req.user = user
    req.token = token
    next()
  } catch(e) {
    res.status(401).send(e)
  }
}

module.exports = auth