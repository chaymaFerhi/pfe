const express = require('express');
const router = express.Router();

const User = require('../models/user');

router.post('/create', async (req,res)=>{
    try {
        data=req.body;
    usr= new User(data);
    savedUser= await usr.save()
    res.status(200).send(savedUser)
        
    } catch (error) {
        (err)=>{
            res.status(400).send(err)
        }
        
    }
    
  
});

router.get( '/getall', (req,res)=>{
    User.find()
    .then(
        (users)=>{
            res.send(users);
        })
    .catch(
        (err)=>{
            res.send(err)
        }
    )
});

router.get('/get', async(req,res)=>{
    
    try {
        users=await User.find({name:'chayma' })
        res.send(users)
    } catch (error) {
        res.send(err)
        
    }
 });

 router.get('/getbyId/:id', (req,res)=>{
    myid=req.params.id;
    User.findOne({_id:myid})
    .then(
        (user)=>{
        res.send(user)
        }
    )

    .catch(
        (err)=>{
            res.send(err)
        }
    )


 });

 router.delete('/deleteusr/:id', async(res,req)=>{
    try {
        id=req.params.id;
        deletedUser= await User.findByIdAndDelete({_id:id});
        res.send(deletedUser)
        
    } catch (error) {
        res.send(error)
        
    }
 });

 router.put( '/update/:id', async(req,res)=>{
    try {
        id=req.params.id;
    newData = req.body;

    updated= await User.findByIdAndUpdate({_id:id}, newData)
    res.send(updated);
        
    } catch (error) {
        res.send(error)

        
    }
    
    
});




module.exports=router;