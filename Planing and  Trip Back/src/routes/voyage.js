const express = require('express');
const router = express.Router();
const Voyage= require('../models/voyage');

router.post('/create', async (req,res)=>{
    try {
        data=req.body;
        Voyage= new Voyage(data);
    savedVoyage= await Voyage.save()
    res.status(200).send(savedVoyage)
        
    } catch (error) {
        (err)=>{
            res.status(400).send(err)
        }
        
    }
    
  
});

router.get( '/getall', (req,res)=>{
    Voyage.find()
    .then(
        (Voyages)=>{
            res.send(Voyages);
        })
    .catch(
        (err)=>{
            res.send(err)
        }
    )
});

router.get('/get', async(req,res)=>{
    
    try {
        Voyages=await Voyage.find({name:'chayma' })
        res.send(Voyages)
    } catch (error) {
        res.send(err)
        
    }
 });

 router.get('/getbyId/:id', (req,res)=>{
    myid=req.params.id;
    Voyage.findOne({_id:myid})
    .then(
        (voyage)=>{
        res.send(Voyage)
        }
    )

    .catch(
        (err)=>{
            res.send(err)
        }
    )


 });

 router.delete('/deleteVoyage/:id', async(res,req)=>{
    try {
        id=req.params.id;
        deletedVoyage= await Voyage.findByIdAndDelete({_id:id});
        res.send(deletedVoyage)
        
    } catch (error) {
        res.send(error)
        
    }
 });

 router.put( '/update/:id', async(req,res)=>{
    try {
        id=req.params.id;
    newData = req.body;

    updated= await Voyage.findByIdAndUpdate({_id:id}, newData)
    res.send(updated);
        
    } catch (error) {
        res.send(error)

        
    }
    
    
});


module.exports=router;
