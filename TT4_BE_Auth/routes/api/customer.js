//Load dependancies
const express = require('express')
const router = express.Router()
const async = require('async')
const axios = require('axios')
const jwt = require('jsonwebtoken')
//const auth = require('../../middleware/auth')

// Load User model
const Customer = require('../../models/Customer')
const { model } = require('mongoose')

module.exports = router
