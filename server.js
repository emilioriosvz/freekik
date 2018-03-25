const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')

mongoose.Promise = Promise

mongoose.connection.on('connected', () => {
  console.log('Connection Established')
})

mongoose.connection.on('reconnected', () => {
  console.log('Connection Reestablished')
})

mongoose.connection.on('disconnected', () => {
  console.log('Connection Disconnected')
})

mongoose.connection.on('close', () => {
  console.log('Connection Closed')
})

mongoose.connection.on('error', (error) => {
  console.log('ERROR: ' + error)
})

const run = async () => {
  await mongoose.connect('mongodb://localhost:27017/freekik', {
    autoReconnect: true,
    reconnectTries: 1000000,
    reconnectInterval: 3000
  })
}

run().catch(error => console.error(error))

app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api', require('./components'))
app.use((error, req, res, next) => res.status(500).json({success: false, error: error.message}))

app.options('*', (req, res) => res.status(200))
app.all('*', (req, res) => res.status(404).send({success: false, response: '404 Not Found'}))

app.listen(3000, () => console.log(`http://localhost:${3000}`))

module.exports = app
