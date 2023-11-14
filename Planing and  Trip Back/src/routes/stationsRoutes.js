const express = require('express');
const stationsController = require('./../controllers/stationsController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.get('/get-all-stations', stationsController.getAllStations);
router.use(authController.protect);
router.use(authController.restrictTo('ROLE_ADMIN'));

// router.post('/create', stationsController.addStation);
router.post('/create', stationsController.addMultiStation);

router
    .route('/:id')
    .get(stationsController.getStation)
    .patch(stationsController.updateStation)
    .delete(stationsController.deleteStation);
module.exports = router;
