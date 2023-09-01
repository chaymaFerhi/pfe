const mongoose= require('mongoose');

const Station = mongoose.model('Station',{

    nom_station: {
        type: String
    },
    localisation: {
        type: String
    },
    
}
)

module.exports=Station;