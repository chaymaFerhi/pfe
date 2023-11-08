const mongoose= require('mongoose');

const VilleModel = mongoose.model('Ville',{

    nom_ville: {
        type: String
    },
    localisation: {
        type: String
    },
    
    
}
)

module.exports=VilleModel;
