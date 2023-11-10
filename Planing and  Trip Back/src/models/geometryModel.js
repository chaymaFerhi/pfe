const mongoose = require('mongoose');
const geometrySchema = new mongoose.Schema({

        coordinates: [],
        typePoint: String
    },
    {
        toJSON: {virtuals: true},
        toObject: {virtuals: true}
    })
const GeometryModel = mongoose.model('Geometry', geometrySchema);

module.exports = GeometryModel;
