const { AppointementModel } = require('../models')

exports.createAppointement = async (req, res) => {
  try {
    let newAppointement = new AppointementModel(req.body)
    newAppointement.save((err, doc) => {
      if (!err) {
        res.status(200).send({
          success: true,
          message: 'Appointement Created Successfully!'
        })
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
  } catch (error) {
    res.status(201).send(error)
  }
}
exports.getAppointement = async (req, res) => {
  try {
    AppointementModel.find()
      .populate('appointementId')
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
