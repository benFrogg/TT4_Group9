//Load dependancies
const express = require('express')
const router = express.Router()
const async = require('async')
const axios = require('axios')
const jwt = require('jsonwebtoken')
const auth = require('../../middleware/auth')

// Load User model
const User = require('../../models/User')
const { find } = require('../../models/User')

//@route POST api/user/login
//@description receives email and password, checks if it is in the database, if yes, return JWT Token (JWT Token is required for protected routes/APIs)
//@access Public
//TODO: JWT Token only can check if user is logged in, but can't check the role of the user (admin,student,instructor)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    // validate
    if (!email || !password)
      return res.status(400).json({ msg: 'Not all fields have been entered.' })
    const user = await User.findOne({ email: email })
    if (!user)
      return res
        .status(400)
        .json({ msg: 'No account with this email has been registered.' })
    //const isMatch = await bcrypt.compare(password, user.password)
    const isMatch = password == user.password ? true : false
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials.' })
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

//@route POST api/user/newAdminuser
//@description Save new Admin User to DB
//@access Login users (Needs to be change to admin only)
router.post('/newAdminUser', auth, async (req, res) => {
  var data = req.body

  try {
    //TODO: validate data
    if (data.role != 'admin') {
      return res.status(400).send(`role must be "admin"`)
    }

    var newUser = new User(data)

    await newUser.save()
    res.status(200).send(`Successfully saved user to DB`)
  } catch (error) {
    if (error.code === 11000) {
      return res.status(500).send(`Server Error: Duplicate user found.`)
    }
    return res.status(500).send(`Server Error: ${error}`)
  }
})

//@route POST api/user/newuser
//@description Save User to DB
//@access Public
router.post('/newUser', async (req, res) => {
  var data = req.body

  try {
    //TODO: validate data
    if (data.role != 'participant') {
      return res.status(400).send(`role must be "participant"`)
    }

    var newUser = new User(data)

    await newUser.save()
    res.status(200).send(`Successfully saved user to DB`)
  } catch (error) {
    if (error.code === 11000) {
      return res.status(500).send(`Server Error: Duplicate user found.`)
    }
    return res.status(500).send(`Server Error: ${error}`)
  }
})

//@route GET api/user/getuserinfo
//@description Get user info based on email
//@access Public
//TODO: NEEDS MORE DETAILED ERRORS, MALFORMED JSON REQUEST RETURNS NULL AND 200
router.get('/getuserinfo', async (req, res) => {
  var data = req.body //data is an obj

  //TODO: may need check negative flow
  User.findOne({ email: data.email })
    .then((foundUserDetails) => res.json(foundUserDetails))
    .catch((error) => res.status(500).send(`Error:${error} `))
})

//@route GET api/user/getalluserinfo
//@description Get ALL user info based on email
//@access Public
router.get('/getalluserinfo', async (req, res) => {
  var data = req.body //data is an obj

  User.find()
    .then((foundUserDetails) => res.json(foundUserDetails))
    .catch((error) => res.status(500).send(`Error:${error} `))
})

//@route POST api/user/updateuser
//@description Find record in db via email, then update the record with new incoming details (Note: Cannot update email as it must be unique)
//@access Public

router.post('/updateuser', async (req, res) => {
  try {
    const { email, password, firstname, lastname } = req.body //data is an obj

    if (!email || !password) {
      throw Error('Require email & password.')
    }

    const updateRespond = await User.findOneAndUpdate(
      { email: email },
      {
        password: password,
        firstname: firstname,
        lastname: lastname,
      },
      {
        rawResult: true,
      }
    )

    if (updateRespond.lastErrorObject.updatedExisting) {
      res.status(200).send(`Update operation successful`)
    } else {
      throw Error('User update failed.')
    }
  } catch (error) {
    res.status(500).send(`Server Error: ${error.message}`)
    return
  }
})

//@route POST api/user/deleteuser
//@description Delete User from DB via user email
//@access Public
//TODO: If user is not found, API still returns 200
router.post('/deleteuser', async (req, res) => {
  var data = req.body //data is an obj

  User.findOneAndDelete({ email: data.email })
    .then(
      res.status(200).send(`Sucessfully deleted user with email ${data.email}`)
    )
    .catch((error) => res.status(500).send(`Error:${error} `))
})

module.exports = router
