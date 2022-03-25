const express = require('express')
const connectDB = require('./config/db')
const cors = require('cors')
var bodyParser = require('body-parser')
require('dotenv').config()

const app = express()

//link routes to app.js
const user = require('./routes/api/user')
const customer = require('./routes/api/customer')

// Connect Database
connectDB()

// Tell Express to use body-parser module (req.body will be readable)
app.use(bodyParser.urlencoded({ extended: true }))
//Tell Express to prepare to receive data (for POST) as json
app.use(express.json())

app.use(cors())

app.get('/', (req, res) => res.send('Hello world!'))

//Use Routes
app.use('/api/user', user)
app.use('/api/customer', customer)

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`DBS Auth Server running on port ${port}`))
