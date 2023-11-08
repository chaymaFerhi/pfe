const mongoose= require('mongoose');

const VoyageModel = mongoose.model('Voyage',{

    date_depart: {
       
    },
    date_arrivee: {
        
    },
    
}
)

module.exports=VoyageModel;
