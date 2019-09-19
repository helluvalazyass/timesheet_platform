'use strict';
const Project = require('../models/project-model')
const User = require('../models/user-model')
const express = require('express')
const auth = require('../middleware/auth')
const router = express.Router()

router.get('/', (req, res) => {
  const manager_id = req.user._id
  Project.find({ manager_id: manager_id })
    .then((result) => {
    console.log(result)
    res.send(result)
  })
    .catch((error) => {
      console.log(error)
      res.status(400).send(error)
    })
})

router.post('/', auth, async (req, res) => {
  try{
    const members = await User.getMemberIdsByEmails(req.body.members)
    console.log("members: ", members)
    const newProject = new Project({
      manager_id: req.user._id,
      name: req.body.name,
      phases: req.body.phases,
      members: members,
      isActive: req.body.isActive,
    })
    
    await newProject.save()
    res.status(201).send()
  }
  catch(error) {
    console.log(error)
    res.status(400).send(error)
  }
})

router.patch('/', (req, res) => {

})

router.delete('/', (req, res) => {

})

module.exports = router