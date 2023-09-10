const express = require('express') ;
require('./config/connect');
const UserRoute = require('./routes/user');
const CompagnieRoute = require('./routes/compagnie');
const ReservationRoute = require('./routes/reservation');
const VoyageRoute = require('./routes/voyage');
const Ville = require('./models/ville');
const Echange = require('./models/echange');
const Station = require('./models/station');

const app= express();
app.use(express.json()); 


app.use('/compagnie',CompagnieRoute);
app.use('/reservation',ReservationRoute);
app.use('/user',UserRoute);
app.use('/voyage',VoyageRoute);
/*
app.post('/create', async (req,res)=>{
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

app.get( '/getall', (req,res)=>{
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
})
 app.get('/get', async(req,res)=>{
    
    try {
        users=await User.find({name:'chayma' })
        res.send(users)
    } catch (error) {
        res.send(err)
        
    }
 })

 app.get('/getbyId/:id', (req,res)=>{
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


 })

 app.get('/getid/:id',async(req,res)=>{
    try {
        id=req.params.id;
        user=await User.findById({_id:id})
        res.send(user)
        
    } catch (error) {
        res.send(error)
    }
 })

 app.delete('/delete/:id', (req,res)=>{
    id= req.params.id
    User.findByIdAndDelete({_id:id})
    .then(
        (deletedUser)=>{
            res.send(deletedUser)

        }
    )
    .catch((err)=>{
        res.send(err)
    })
 })

 app.delete('/deleteusr/:id', async(res,req)=>{
    try {
        id=req.params.id;
        deletedUser= await User.findByIdAndDelete({_id:id});
        res.send(deletedUser)
        
    } catch (error) {
        res.send(error)
        
    }
 })

app.put( '/update/:id', async(req,res)=>{
    try {
        id=req.params.id;
    newData = req.body;

    updated= await User.findByIdAndUpdate({_id:id}, newData)
    res.send(updated);
        
    } catch (error) {
        res.send(error)

        
    }
    
    
});

*/

app.listen( 3000, ()=>{
    console.log('server work');
})


