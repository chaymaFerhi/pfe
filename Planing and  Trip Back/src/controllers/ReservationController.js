const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');
const Reservation = require('../models/reservationModel');
const AppError = require("../utils/appError");



exports.getReservation = factory.getOne(Reservation);
exports.updateReservation = factory.updateOne(Reservation);
exports.getAllReservations = factory.getAll(Reservation);
exports.addReservation = factory.createOne(Reservation);
exports.deleteReservation = factory.deleteOne(Reservation);

