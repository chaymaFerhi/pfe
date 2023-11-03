const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
// router.post('/login', authController.login);
// router.post('/codeVerification', authController.VeriferCodeSMS);
//
// router.post('/renvoi', authController.renvoyerCodeSMS);
// router.post('/forgotPassword', authController.forgotPassword);
// router.post('/confirm', authController.confirmInscription);
// router.patch('/resetPassword', authController.resetPassword);

// Protect all routes after this middleware
// router.use(authController.protect);
//
// router.patch('/updateMyPassword', authController.updatePassword);
// router.get('/me', userController.getMe, userController.getUser);
// router.patch(
//     '/updateMe',
//     userController.uploadUserPhoto,
//     userController.resizeUserPhoto,
//     userController.updateMe
// );
// router.delete('/deleteMe', userController.deleteMe);
//
// router.use(authController.restrictTo('admin'));
//
// router
//     .route('/')
//     .get(userController.getAllUsers)
//     .post(userController.createUser);
//
// router
//     .route('/:id')
//     .get(userController.getUser)
//     .patch(userController.updateUser)
//     .delete(userController.deleteUser);

module.exports = router;
