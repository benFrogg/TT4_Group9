//Load dependancies
const express = require('express')
const router = express.Router()
const async = require('async')
const axios = require('axios')
const jwt = require('jsonwebtoken')
const auth = require('../../middleware/auth')

// Load Customer model
const Customer = require('../../models/Customer')
const { model } = require('mongoose')

//@route POST api/customer/createuser               (Create)
//@description receives customer_name,customer_phone,customer_address,password. Balance is populated as 0 and role is populated as user
//@access Public

router.post('/createuser', async (req, res) => {
  var data = req.body

  try {
    data.role = 'user'
    data.balance = 0
    var newUser = new Customer(data)

    await newUser.save()
    res.status(200).send(`Successfully saved user to DB`)
  } catch (error) {
    if (error.code === 11000) {
      return res.status(500).send(`Server Error: Duplicate user found.`)
    }
    return res.status(500).send(`Server Error: ${error}`)
  }
})

//@route GET api/customer/getcusdetails             (Read)
//@description receives customerId, returns all details about customer
//@access Protected (role = user or admin)

module.exports = router
