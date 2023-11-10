const mongoose= require('mongoose');

const VilleModel = mongoose.model('Ville',{

    nom_ville: {
        type: String
    },
    localisation: {
        type: String
    },
    
    
},
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
)

module.exports=VilleModel;
