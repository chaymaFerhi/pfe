const express = require('express');
const voyagesController = require("../controllers/VoyageController");
const authController = require("../controllers/authController");

const router = express.Router();

router.get('/get-all-voyages', voyagesController.getAllVoyages);
router.use(authController.protect);
router.use(authController.restrictTo('ROLE_ADMIN'));

router.post('/', voyagesController.addVoyage);

router
    .route('/:id')
    .get(voyagesController.getVoyage)
    .patch(voyagesController.updateVoyage)
    .delete(voyagesController.deleteVoyage);
module.exports = router;
