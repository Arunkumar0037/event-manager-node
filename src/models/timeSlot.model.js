const { mongoose } = require('../shared/sharedModules')
Schema = mongoose.Schema;

const timeSlotSchema = Schema({
    slotBatch: {
        type: Number,
        required: true,
        enum : [1, 2], // 1 = Morning, 2 = Evening
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
},
{ timestamps: true }
)
timeSlotSchema.index({ startTime: 1, endTime: 1 }, { unique: true })


timeSlotSchema.index({'$**': 'text'});
module.exports = mongoose.model('timeSlot', timeSlotSchema);