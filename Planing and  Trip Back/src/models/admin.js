const mongoose= require('mongoose');

const adminSchema =new mongoose.Schema({

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
const Admin = mongoose.model('Admin', adminSchema);

module.exports=Admin;
