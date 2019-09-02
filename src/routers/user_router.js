const express = require('express')
const router = express.Router()
const User = require('../models/user-model')

router.post('/user', async (req, res) => {
  // console.log(req.body)
  // res.send('Posted!')
  const user = new User(req.body)
  try {
    
    await user.save()
    res.status(201).send(user)
  }
  catch(e) {
    res.status(400).send(e)
    console.log(e)
  }
  

})

module.exports = router