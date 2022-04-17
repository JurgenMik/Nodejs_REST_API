const express = require('express')
const router = express.Router()
const Subscriber = require('../models/subscriber')


// setting up router endpoints in response to http requests - with res & req handling
// GET
router.get('/', async(req, res) => {
  try{
    // await for exec
    const subscribers = await Subscriber.find()
    res.json(subscribers)
  } catch (err) {
    // in occurrence of an error -> notify user with an error in json format and a server status code
    res.status(500).json({message: err.message})
  }
})

// GET one
router.get('/:id', getSubscriber, (req, res) => {
  // send response in json format consisting of information on the subscriber of the passed id
  res.json(res.subscriber)
// Create
router.post('/', async(req, res) => {
  const subscriber = new Subscriber({
    // get name property of the sent request body
    name: req.body.name,
    subscribedToChannel: req.body.subscribedToChannel
  })
  try{
    const newSubscriber = await subscriber.save()
    // 201 - successfully created a new obj
    res.status(201).json(newSubscriber)
  }catch(err){
    // 400 - error with user input
    res.status(400).json({message:err.message})
  }
})

})

// Put -> update all information , patch -> specific update request which only updates based on information contained within the request
router.patch('/:id', getSubscriber, async (req, res) => {
 if (req.body.name != null){
   res.subscriber.name = req.body.name
 }
  if (req.body.subscribedToChannel!= null){
    res.subscriber.subscribedToChannel = req.body.subscribedToChannel
  }
  try{
    const updatedSubscriber = await res.subscriber.save()
    res.json(updatedSubscriber)
  } catch(err){
    res.status(400).json({message: err.message})

  }
})

// Delete
router.delete('/:id', getSubscriber, async(req, res) => {
try{
  await res.subscriber.remove()
  res.json({message: 'deleted subscriber'})
} catch(err){
  res.status(500).json({message: err.message})

}

})

// next -> upon being called move onto req, res
// middleware for :id routes
async function getSubscriber(req, res, next){
  let subscriber
  try{
    // try to get user based on passed id
    subscriber = await Subscriber.findById((req.params.id))
    if (subscriber == null){
      // leave function
      return res.status(404).json({message: 'cant find subscriber'})
    }

  }catch(err){
    return res.status(500).json({message: err.message})
  }

  res.subscriber = subscriber
  // move onto next piece of middleware or the request itself
  next()

}

module.exports = router