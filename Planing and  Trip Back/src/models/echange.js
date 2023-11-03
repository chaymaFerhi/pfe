const mongoose= require('mongoose');

const Echange = mongoose.model('Echange',{

    heure_depart: {
        type: Number
    },
    heure_arrivee: {
        type: Number
    },
    
}
)

module.exports=Echange;