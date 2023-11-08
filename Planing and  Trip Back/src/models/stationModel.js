const mongoose = require('mongoose');
const stationSchema = new mongoose.Schema({

        name: {
            type: String,
            required: [true, 'Please tell us your name!'],
        },
        areaList: [
            {
                type: String
            }
        ],
        localisation: {
            type: String
        },
    longitude: {
            type: String
        },
    latitude: {
            type: String
        },

    }
)
const StationModel = mongoose.model('Station', stationSchema);

module.exports = StationModel;
