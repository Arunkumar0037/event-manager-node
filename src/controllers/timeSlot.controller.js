const { TimeSlotModel } = require('../models')
const { moment } = require('../shared/sharedModules')

exports.createtimeSlot = async (req, res) => {
  console.log('Create Slot')
  try {
    let conflictSlot = await TimeSlotModel.find({
      $and: [
        { endTime: { $gte: new Date(req.body.startTime) } },
        { startTime: { $lte: new Date(req.body.endTime) } }
      ]
    }).exec()
    if (conflictSlot.length <= 0) {
      var newTimeSlot = new TimeSlotModel(req.body)
      newTimeSlot.save((err, doc) => {
        if (!err) {
          res
            .status(200)
            .send({ success: true, message: 'Slot Created Successfully!' })
        } else if (err) {
          if (err.code == 11000) {
            res.status(422).send({
              success: false,
              message: tiltelCase(
                `${Object.keys(err.keyPattern)[0].replace(
                  '_',
                  ' '
                )} already exist`
              )
            })
          }
        }
      })
    } else {
      res.status(200).send({
        success: false,
        message: 'Slot not available, Choose another slot!'
      })
    }
  } catch (error) {
    res.status(201).send(error)
  }
}

exports.getimeSlot = async (req, res) => {
  try {
    let query = req.query
    let fromDate = moment(new Date(query.startTime)).format(
      'YYYY-MM-DD 00:00:00'
    )
    let toDate = moment(new Date(query.startTime)).format('YYYY-MM-DD 23:59:59')

    TimeSlotModel.aggregate([
      {
        $match: {
          startTime: {
            $gt: new Date(fromDate),
            $lt: new Date(toDate)
          }
        }
      },
      {
        $group: {
          _id: '$slotBatch',
          slots: { $push: { startTime: '$startTime', endTime: '$endTime' } }
        }
      }
    ])
      .then(slot => {
        res.status(200).send({ success: true, data: slot })
      })
      .catch(error => {
        res.status(400).send({ success: false, error: error })
      })
  } catch (error) {
    res.status(201).send({ success: false, error: error })
  }
}

// Function to convert error message format - Title Case
function tiltelCase (str) {
  const arr = str.split(' ')
  for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1)
  }
  const str2 = arr.join(' ')
  return str2
}
