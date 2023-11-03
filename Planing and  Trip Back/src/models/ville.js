const mongoose= require('mongoose');

const Ville = mongoose.model('Ville',{

    nom_ville: {
        type: String
    },
    localisation: {
        type: String
    },
    
    
}
)

module.exports=Ville;