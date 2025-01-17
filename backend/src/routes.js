const express = require('express')

const feesController = require('./controllers/feesController')
const plansController = require('./controllers/plansController')
const comparisonController = require('./controllers/comparisonController')

const routes = express.Router()

routes.post('/newfee',feesController.create)
routes.get('/fees',feesController.get)

routes.post('/newplan',plansController.create)
routes.get('/plans',plansController.get)

routes.post('/comparison',comparisonController.compare)

module.exports = routes
