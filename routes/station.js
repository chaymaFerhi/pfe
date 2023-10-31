const express = require('express');
const router = express.Router();
const Station = require('../models/station');

router.post('/create', async (req,res)=>{
    try {
        data=req.body;
        station= new Station(data);
    savedstation= await station.save()
    res.status(200).send(savedstation)
        
    } catch (error) {
        (err)=>{
            res.status(400).send(err)
        }
        
    }
    
  
});

router.get( '/getall', (req,res)=>{
    Station.find()
    .then(
        (station)=>{
            res.send(station);
        })
    .catch(
        (err)=>{
            res.send(err)
        }
    )
});

router.get('/get', async(req,res)=>{
    
    try {
        station=await Station.find({name:'chayma' })
        res.send(station)
    } catch (error) {
        res.send(err)
        
    }
 });

 router.get('/getbyId/:id', (req,res)=>{
    myid=req.params.id;
    Station.findOne({_id:myid})
    .then(
        (station)=>{
        res.send(station)
        }
    )

    .catch(
        (err)=>{
            res.send(err)
        }
    )


 });



module.exports=router;