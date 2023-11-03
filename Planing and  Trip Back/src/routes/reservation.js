const express = require('express');

const router = express.Router();

const Reservation = require('../models/reservation');

router.post('/create', async (req,res)=>{
    try {
        data=req.body;
        reservation= new Reservation (data);
    savedreservation= await reservation.save()
    res.status(200).send(savedreservation)
        
    } catch (error) {
        (err)=>{
            res.status(400).send(err)
        }
        
    }
    
  
});

router.get( '/getall', (req,res)=>{
    Reservation.find()
    .then(
        (reservations)=>{
            res.send(reservations);
        })
    .catch(
        (err)=>{
            res.send(err)
        }
    )
});

router.get('/get', async(req,res)=>{
    
    try {
        reservations=await Reservation.find({name:'chayma' })
        res.send(reservations)
    } catch (error) {
        res.send(err)
        
    }
 });

 router.get('/getbyId/:id', (req,res)=>{
    myid=req.params.id;
    Reservation.findOne({_id:myid})
    .then(
        (reservation)=>{
        res.send(reservation)
        }
    )

    .catch(
        (err)=>{
            res.send(err)
        }
    )


 });


module.exports=router;
