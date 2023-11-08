const mongoose= require('mongoose');

const EchangeModel = mongoose.model('Echange',{

    heure_depart: {
        type: Number
    },
    heure_arrivee: {
        type: Number
    },
    
}
)

module.exports=EchangeModel;
