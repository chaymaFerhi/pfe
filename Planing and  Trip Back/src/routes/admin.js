const express = require('express');
const router = express.Router();
const Admin = require('../models/admin');

router.post('/create', async (req,res)=>{
    try {
        data=req.body;
    admin= new Admin(data);
    savedadmin= await admin.save()
    res.status(200).send(savedadmin)
        
    } catch (error) {
        (err)=>{
            res.status(400).send(err)
        }
        
    }
    
  
});

router.get( '/getall', (req,res)=>{
    Admin.find()
    .then(
        (admin)=>{
            res.send(admin);
        })
    .catch(
        (err)=>{
            res.send(err)
        }
    )
});

router.get('/get', async(req,res)=>{
    
    try {
        admin=await Admin.find({name:'chayma' })
        res.send(admin)
    } catch (error) {
        res.send(err)
        
    }
 });

 router.get('/getbyId/:id', (req,res)=>{
    myid=req.params.id;
    Admin.findOne({_id:myid})
    .then(
        (admin)=>{
        res.send(admin)
        }
    )

    .catch(
        (err)=>{
            res.send(err)
        }
    )


 });



module.exports=router;
