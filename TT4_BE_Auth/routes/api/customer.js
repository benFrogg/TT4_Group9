//Load dependancies
const express = require('express')
const router = express.Router()
const async = require('async')
const axios = require('axios')
const jwt = require('jsonwebtoken')
const auth = require('../../middleware/auth')
const jwt_decode = require('jwt-decode')

// Load Customer model
const Customer = require('../../models/Customer')
const { model } = require('mongoose')

//@route POST api/customer/login
//@description receives email and password, checks if it is in the database, if yes, return JWT Token (JWT Token is required for protected routes/APIs)
//@access Public

router.post('/login', async (req, res) => {
  try {
    const { customer_email, password } = req.body
    // validate
    if (!customer_email || !password)
      return res.status(400).json({ msg: 'Not all fields have been entered.' })
    const cus = await Customer.findOne({ customer_email: customer_email })
    if (!cus)
      return res
        .status(400)
        .json({ msg: 'No account with this email has been registered.' })

    const isMatch = password == cus.password ? true : false
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials.' })

    //add role payload

    let jwtpayload = {
      exp: 3600,
      customer_id: cus.CustomerId,
      role: cus.role,
    }

    const token = jwt.sign({ jwtpayload }, process.env.JWT_TOKEN_SECRET)
    res.json({
      token,
      Data: {
        id: cus.CustomerId,
        email: cus.customer_email,
        role: cus.role,
      },
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

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

router.get('/getcusdetails', auth, async (req, res) => {
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

//@route POST api/customer/transect
//@description receives customer_email and changes to balance (Can be positive or negative), returns error if balance is negative
//@access Protected (role = admin)

//extract role and customerId from JWT token
//if role != admin, return error

router.post('/transect', auth, async (req, res) => {
  try {
    const { change } = req.body //data is an obj

    const token = req.header('x-auth-token')
    const decoded = jwt_decode(token)
    const decodedstr = JSON.stringify(decoded)

    if (!change) {
      throw Error('"change" cannot be empty')
    }

    if (decoded.jwtpayload.role != 'admin') {
      return res.status(401).send(`Unauthorized: You must be an Admin`)
    }

    let cusData = await Customer.findOne({
      CustomerId: decoded.jwtpayload.customer_id,
    })

    let newValue = cusData.balance + change

    if (newValue < 0) {
      return res
        .status(400)
        .send(`Transection Failed: New account balance cannot be lower than 0`)
    }

    let doc = await Customer.findOneAndUpdate(
      { CustomerId: decoded.jwtpayload.customer_id },
      { balance: newValue }
    )

    res.status(200).send(`Transection Successful`)
  } catch (error) {
    res.status(500).send(`Server Error: ${error.message}`)
    return
  }
})

module.exports = router
