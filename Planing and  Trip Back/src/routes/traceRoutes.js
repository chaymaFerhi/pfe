const express = require('express');
const tracesController = require('./../controllers/traceController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.get('/get-all-traces', tracesController.getAllTraces);
router.use(authController.protect);

router.post('/search-traces', authController.restrictTo('ROLE_CLIENT','ROLE_ADMIN'), tracesController.searchTrace);

router.use(authController.restrictTo('ROLE_ADMIN'));
router.post('/add-trace', tracesController.addTrace);
router.post('/add-multi-trace', tracesController.addMultiTrace);
router
    .route('/:id')
    .get(tracesController.getTrace)
    .patch(tracesController.updateTrace)
    .delete(tracesController.deleteTrace);
module.exports = router;
