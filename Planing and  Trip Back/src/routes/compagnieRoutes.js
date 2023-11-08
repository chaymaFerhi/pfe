const express = require('express');
const router = express.Router();
const CompagnieRoutes= require('../models/compagnieModel');

router.post('/create', async (req,res)=>{
    try {
        data=req.body;
    compagnie= new CompagnieRoutes(data);
    savedcompagnie= await compagnie.save()
    res.status(200).send(savedcompagnie)
        
    } catch (error) {
        (err)=>{
            res.status(400).send(err)
        }
        
    }
    
  
});

router.get( '/getall', (req,res)=>{
    CompagnieRoutes.find()
    .then(
        (compagnies)=>{
            res.send(compagnies);
        })
    .catch(
        (err)=>{
            res.send(err)
        }
    )
});

router.get('/get', async(req,res)=>{
    
    try {
        compagnies=await CompagnieRoutes.find({name:'chayma' })
        res.send(compagnies)
    } catch (error) {
        res.send(err)
        
    }
 });

 router.get('/getbyId/:id', (req,res)=>{
    myid=req.params.id;
    CompagnieRoutes.findOne({_id:myid})
    .then(
        (compagnie)=>{
        res.send(compagnie)
        }
    )

    .catch(
        (err)=>{
            res.send(err)
        }
    )


 });



module.exports=router;
