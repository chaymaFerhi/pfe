const mongoose= require('mongoose');

const CompagnieModel = mongoose.model('Compagnie',{

    nom_compagnie: {
        type: String
    },
    
    
}
)

module.exports=CompagnieModel;
