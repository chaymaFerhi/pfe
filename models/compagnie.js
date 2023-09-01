const mongoose= require('mongoose');

const Compagnie = mongoose.model('Compagnie',{

    nom_compagnie: {
        type: String
    },
    
    
}
)

module.exports=Compagnie;