const mongoose= require('mongoose');

const ReservationModel = mongoose.model('Reservation',{

    date_reservation: {
       
    },
    trace: {

    },
    user:{

    },

    
}
)

module.exports=ReservationModel;
