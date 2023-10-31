const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt= require('jsonwebtoken')
const User = require('../models/user');
const bodyParser = require('body-parser');
app.use(bodyParser.json());


router.post('/register',async(req,res)=>{
    data=req.body;
    usr= new User(data);

    salt= bcrypt.genSaltSync(10);
    cryptedPass=await bcrypt.hashSync(data.password , salt)
    usr.password=cryptedPass;
    usr.save()
    .then(
        (saved)=>{
        res.status(200).send(saved)
        }
    )

    .catch(
        (err)=>{
            res.status(400).send(err)
        }
    )

    

});


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
 router.post('/login',async(req,res)=>{
    data=req.body;
    usr= await User.findOne({email: data.email})
    if (!usr){
        res.status(404).send('email invalid')
    }else {
        validPass= bcrypt.compare(data.password , usr.password)}

        if (!validPass){
            res.status(401).send('password invalid')
        }else {
            payload={
                _id: usr._id,     
                email: usr.email,
                /*name: usr.name*/
            }
            token= jwt.sign(payload,'123987')
            res.status(200).send({mytoken : token})

        }
    }
)

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