const { AppointementController } = require('../controllers');
let route = require('express').Router()

route.post('/add', AppointementController.createAppointement);
route.get('/get', AppointementController.getAppointement);

module.exports = route;