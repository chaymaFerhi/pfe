const express = require('express');

const router = express.Router();

const reservationController = require("../controllers/ReservationController");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

router.use(authController.protect);
router.post('/add-reservation', reservationController.addReservation);
router.get('/get-my-reservations',userController.getMe, reservationController.getAllReservations);





module.exports=router;
