// create a model to interact with the db
const mongoose = require('mongoose')
// obj with key property values
const subscriberSchema = new mongoose.Schema({
    name:{
      type: String,
      required: true
    },
    subscribedToChannel:{
      type: String,
      required: true
    },
    subscribeDate:{
      type: Date,
      required: true,
      default: Date.now
    }
})
// model interacts with the db corresponding to the schema
module.exports = mongoose.model('Subscriber', subscriberSchema)