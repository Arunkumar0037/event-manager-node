const { mongoose } = require('../shared/sharedModules')
Schema = mongoose.Schema;

const appointementSchema = Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true,
        unique:true
    },
    appointementId : {
        type: Schema.Types.ObjectId,
        ref: 'timeSlot',
        required: true,
        unique:true

    }
},
{ timestamps: true }
)
appointementSchema.index({ contact: 1, appointementId: 1 }, { unique: true })



appointementSchema.index({'$**': 'text'});
module.exports = mongoose.model('appointement', appointementSchema);
