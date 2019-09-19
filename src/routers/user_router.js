'use strict';
const express = require('express')
const router = express.Router()
const User = require('../models/user-model')
const auth = require('../middleware/auth')

router.get('/search/:query', async (req, res) => {
  const query = req.params.query
  try{
    const results = await User.find({'email': new RegExp('.*' + query + '.*', 'i')}, "email").exec()
    console.log(results)
    const emails = results.map((result) => {
      return result.email
    })
    res.send(emails)
  }
  catch(e) {
    res.status(400).send(e)
  }
})

router.post('/signup', async (req, res) => {
  // console.log(req.body)
  // res.send('Posted!')
  const user = new User(req.body)
  try {
    const token = await user.generateAuthToken()
    await user.save()
    res.cookie('_token', token, {
      expires: new Date(Date.now() + 900000),
      httpOnly: true
    })
    res.status(201).send(user)
  }
  catch(e) {
    res.status(400).send(e)
    // console.log(e)
  }
})

router.post('/login', async (req, res) => {
  const { user, error } =  await User.searchByCredentials(req.body.email, req.body.password)
  if(error) {
    return res.status(404).send()
  }
  const token = await user.generateAuthToken()
  console.log(req.cookies)
  res.cookie('_token', token, {
    expires: new Date(Date.now() + 900000),
    httpOnly: true
  })
  res.status(200).send({ user: user })
})

module.exports = router