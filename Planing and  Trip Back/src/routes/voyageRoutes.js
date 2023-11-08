const express = require('express');
const router = express.Router();
let VoyageRoutes = require('../models/voyageModel');

router.post('/create', async (req, res) => {
    let data;
    try {
        data = req.body;
        VoyageRoutes = new VoyageRoutes(data);
        savedVoyage = await VoyageRoutes.save()
        res.status(200).send(savedVoyage)

    } catch (error) {
        (err) => {
            res.status(400).send(err)
        }

    }


});

router.get('/getall', (req, res) => {
    VoyageRoutes.find()
        .then(
            (Voyages) => {
                res.send(Voyages);
            })
        .catch(
            (err) => {
                res.send(err)
            }
        )
});

router.get('/get', async (req, res) => {

    try {
        Voyages = await VoyageRoutes.find({name: 'chayma'})
        res.send(Voyages)
    } catch (error) {
        res.send(err)

    }
});

router.get('/getbyId/:id', (req, res) => {
    myid = req.params.id;
    VoyageRoutes.findOne({_id: myid})
        .then(
            (voyage) => {
                res.send(VoyageRoutes)
            }
        )

        .catch(
            (err) => {
                res.send(err)
            }
        )


});

router.delete('/deleteVoyage/:id', async (res, req) => {
    try {
        id = req.params.id;
        deletedVoyage = await VoyageRoutes.findByIdAndDelete({_id: id});
        res.send(deletedVoyage)

    } catch (error) {
        res.send(error)

    }
});

router.put('/update/:id', async (req, res) => {
    try {
        id = req.params.id;
        newData = req.body;

        updated = await VoyageRoutes.findByIdAndUpdate({_id: id}, newData)
        res.send(updated);

    } catch (error) {
        res.send(error)


    }


});


module.exports = router;
