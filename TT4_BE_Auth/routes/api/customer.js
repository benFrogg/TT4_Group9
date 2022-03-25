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

router.get('/getcusdetails', async (req, res) => {
  var data = req.body //data is an obj

  Customer.findOne({ customer_email: data.customer_email })
    .then((foundCusDetails) => res.json(foundCusDetails))
    .catch((error) => res.status(500).send(`Error:${error} `))
})

//@route POST api/customer/upgradeRole             (Update)
//@description receives customer_email, upgrades role to admin
//@access Protected (role = admin)

router.post('/upgraderole', async (req, res) => {
  try {
    const { customer_email } = req.body //data is an obj
    console.log(customer_email)
    if (!customer_email) {
      throw Error('customer_email cannot be empty')
    }

    let doc = await Customer.findOneAndUpdate(
      { customer_email: customer_email },
      { role: 'admin' }
    )

    res
      .status(200)
      .send(
        `Account with email ${customer_email} upgraded successfully to admin`
      )
  } catch (error) {
    res.status(500).send(`Server Error: ${error.message}`)
    return
  }
})

module.exports = router
