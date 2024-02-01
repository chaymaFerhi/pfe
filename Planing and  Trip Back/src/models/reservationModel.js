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


    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
)

reservationSchema.pre(/^find/, function(next) {
    this.populate({
        path: 'user',
        select: ''
    });

    next();
});
reservationSchema.pre(/^find/, function(next) {
    this.populate({
        path: 'trace',
        select: ''
    });

    next();
});

const reservationModel = mongoose.model('Reservation', reservationSchema);

module.exports = reservationModel;
