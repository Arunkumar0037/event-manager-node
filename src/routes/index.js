let Appointement = require('./appointement.route')
let TimeSlot = require('./timeSlot.route')



module.exports = (app) => {
    app.use('/appointement', Appointement)
    app.use('/timeSlot', TimeSlot)

}
