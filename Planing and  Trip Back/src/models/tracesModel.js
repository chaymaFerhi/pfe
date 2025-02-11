const mongoose = require('mongoose');

const traceSchema = new mongoose.Schema({


        numeroLigne: String,
        transport: String,
        departureDate: String,
        arrivalDate: String,
        voyage: {
            type: mongoose.Schema.ObjectId,
            ref: 'Voyage',
        },


        depart: {
            type: mongoose.Schema.ObjectId,
            ref: 'Station',
        },
        between: [{
            type: mongoose.Schema.ObjectId,
            ref: 'Station',
        }],
        destination: {
            type: mongoose.Schema.ObjectId,
            ref: 'Station',
        },
        geometry: {
            type: mongoose.Schema.ObjectId,
            ref: 'Geometry',
        },
        recordTimestamp: Date
    },
    {
        toJSON: {virtuals: true},
        toObject: {virtuals: true}
    })

traceSchema.pre(/^find/, function (next) {
    this.populate('station').populate({
        path: 'depart',
        select: 'name areaList'
    });
    next();
});
traceSchema.pre(/^find/, function (next) {
    this.populate('station').populate({
        path: 'destination',
        select: 'name areaList'
    });
    next();

})
traceSchema.pre(/^find/, function (next) {
    this.populate('station').populate({
        path: 'between',
        select: 'name areaList'
    });
    next();

})

traceSchema.pre(/^find/, function (next) {
    this.populate('voyage').populate({
        path: 'voyage'
    });
    next();
});
traceSchema.pre(/^find/, function (next) {
    this.populate('geometry').populate({
        path: 'geometry'
    });
    next();
});
const TraceModel = mongoose.model('Trace', traceSchema);

module.exports = TraceModel;
