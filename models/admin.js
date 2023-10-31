const mongoose= require('mongoose');

const Admin = mongoose.model('Admin',{

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

module.exports=Admin;