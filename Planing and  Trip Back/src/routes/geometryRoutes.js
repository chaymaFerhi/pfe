const express = require('express');
const geometrysController = require('./../controllers/GeometryController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.get('/get-all-geometrys', geometrysController.getAllGeometrys);
router.use(authController.protect);
router.use(authController.restrictTo('ROLE_ADMIN'));

router.post('/create', geometrysController.addGeometry);

router
    .route('/:id')
    .get(geometrysController.getGeometry)
    .patch(geometrysController.updateGeometry)
    .delete(geometrysController.deleteGeometry);
module.exports = router;
