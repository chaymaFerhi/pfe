const express = require('express');
const stationsController = require('./../controllers/stationsController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.get('/get-all-stations', stationsController.getAllStations);
router.post('/create', stationsController.addStation);


module.exports = router;
