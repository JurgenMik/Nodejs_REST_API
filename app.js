// load .env variables
require('dotenv').config()
const express = require ('express')
const mongoose = require ('mongoose')
const app = express()

//connecting to DB
mongoose.connect(process.env.DATABASE_URL,
    {useNewUrlParser: true })

const db = mongoose.connection
// error log
db.on('error' , (error)=> console.log(error))
// once connected to db
db.once('open', ()=> console.log('Connected to Database'))

// lets server accept .json as body
app.use(express.json)

const subscribersRouter = require('./routes/subscribers')
app.use('/subscribers', subscribersRouter)

app.listen(3000, () => console.log('Server started'))