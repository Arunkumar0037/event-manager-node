const { TimeSlotController } = require('../controllers');
let route = require('express').Router()

route.post('/add', TimeSlotController.createtimeSlot);
route.get('/get', TimeSlotController.getimeSlot);

module.exports = route;