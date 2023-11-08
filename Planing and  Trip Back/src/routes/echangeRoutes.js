const express = require('express');
const router = express.Router();
const EchangeRoutes = require('../models/echangeModel');

router.post('/create', async (req,res)=>{
    try {
        data=req.body;
        echange= new EchangeRoutes(data);
    savedechange= await echange.save()
    res.status(200).send(savedechange)
        
    } catch (error) {
        (err)=>{
            res.status(400).send(err)
        }
        
    }
    
  
});

router.get( '/getall', (req,res)=>{
    EchangeRoutes.find()
    .then(
        (echange)=>{
            res.send(echange);
        })
    .catch(
        (err)=>{
            res.send(err)
        }
    )
});

router.get('/get', async(req,res)=>{
    
    try {
        echange=await EchangeRoutes.find({name:'chayma' })
        res.send(echange)
    } catch (error) {
        res.send(err)
        
    }
 });

 router.get('/getbyId/:id', (req,res)=>{
    myid=req.params.id;
    EchangeRoutes.findOne({_id:myid})
    .then(
        (echange)=>{
        res.send(echange)
        }
    )

    .catch(
        (err)=>{
            res.send(err)
        }
    )


 });



module.exports=router;
