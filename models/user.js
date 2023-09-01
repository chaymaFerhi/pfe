const mongoose= require('mongoose');

const User = mongoose.model('User',{

    nom: {
        type: String
    },
    prenom: {
        type: String
    },
    age: {
        type: Number
    },
    email:{
        type: String
    },
    NumTel: {
        type: Number
    },
}
)

module.exports=User;