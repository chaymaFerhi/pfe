const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({

        date_reservation: String,
        trace: {
            type: mongoose.Schema.ObjectId,
            ref: 'Trace',
        },
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
        },


    }
)

const reservationModel = mongoose.model('Reservation', reservationSchema);

module.exports = reservationModel;
