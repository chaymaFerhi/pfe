const express = require('express');
const stationsController = require('./../controllers/stationsController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.get('/get_all_stations', stationsController.getAllStations);


module.exports = router;
