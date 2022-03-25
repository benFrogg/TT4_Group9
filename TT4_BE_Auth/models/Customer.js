const mongoose = require('mongoose')

const CustSchema = new mongoose.Schema(
  {
    customerId: {
      type: String,
      required: true,
      unique: true,
    },
    customer_name: {
      type: String,
      required: true,
    },
    customer_phone: {
      type: String,
      required: true,
    },
    customer_address: {
      type: String,
      required: true,
    },
    balance: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
  },
  { strict: true }
)

module.exports = Customer = mongoose.model('customerSchema', CustSchema)
