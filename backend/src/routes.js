const express = require('express')

const feesController = require('./controllers/feesController')

const routes = express.Router()

routes.get('/',(req, res) => {
  res.send('Hello World!')
})

routes.post('/newfee',feesController.create)
routes.get('/fees',feesController.get)

module.exports = routes