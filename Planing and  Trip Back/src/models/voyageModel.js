const mongoose = require('mongoose');
const voyageSchema = new mongoose.Schema({

        coordinates: [
            [
                {
                    type: Number
                }
            ]
        ],
        typeShape: String
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
)
const VoyageModel = mongoose.model('Voyage', voyageSchema)

module.exports = VoyageModel;
