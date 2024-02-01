const mongoose = require('mongoose');
const stationSchema = new mongoose.Schema({

        name: {
            type: String,
            required: [true, 'Please tell us your name!'],
        },
        line: String,
        localisation: {
            type: String
        },
        longitude: {
            type: String
        },
        latitude: {
            type: String
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
    },
    {
        toJSON: {virtuals: true},
        toObject: {virtuals: true}
    }
)
const StationModel = mongoose.model('Station', stationSchema);

module.exports = StationModel;
