const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Email = require('../utils/email');
// const client = require('twilio')(
//     process.env.TWILIO_ACCOUNT_SID,
//     process.env.TWILIO_AUTH_TOKEN
// );
const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

const createSendToken = (user, statusCode, req, res) => {
    const token = signToken(user._id);
    // const expiredIn = new Date(
    //     Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    // );
    // const cookieOptions = {
    //   expires: new Date(
    //     Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    //   ),
    //   httpOnly: true,
    // };
    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

    // res.cookie('jwt', token, cookieOptions);

    // Remove password from output
    user.password = undefined;

    res.status(statusCode).json({
        status: 'success',
        token,
        // expiredIn,
        // data: {
        //     user,
        // },
    });
};

exports.signup = catchAsync(async (req, res, next) => {
    console.log('sign',req.body);
    const newUser = await User.create(req.body);
    await newUser.save({ validateBeforeSave: false });
    // console.log(newUser);
    // SendSMS(newUser.phonenumber);
    // await new Email(newUser, codeInscription).confirmInscription();
    // console.log(codeInscription);
    createSendToken(newUser, 201, req, res);
    // console.log(url);
});

exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    // 1) Check if email and password exist
    if (!email || !password) {
        return next(new AppError('Vous devez ajouter votre email ou mot de passe', 400));
    }
    // 2) Check if user exists && password is correct
    const user = await User.findOne({ email }).select('+password');
    // console.log(user);
    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError('Email ou  mot de passe invalide', 400));
    }

    if (!user.active) {
        return next(new AppError('Vous devez activer votre compte', 402));
    }

    // 3) If everything ok, send token to client
    createSendToken(user, 200, req, res);
});
//send code with SMS phone
const SendSMS = catchAsync(async (user, req, res, next) => {
    // console.log('phonenumber', user);
    if (!user) {
        return next(new AppError('Numéro de téléphone invalide!', 400));
    }
    // const SMS = await client.verify
    //     .services(process.env.TWILIO_SERVICE_ID)
    //     .verifications.create({
    //         locale: 'fr',
    //         to: `+${phonenumber}`,
    //         channel: 'sms',
    //     });
});

//verifer le code envoyer SMS
exports.renvoyerCodeSMS = catchAsync(async (req, res, next) => {
    // console.log(req.body);
    if (!req.body.phonenumber) {
        return next(new AppError('كود تنحى!عاود...', 400));
    }

    SendSMS(req.body.phonenumber);
    res.status(200).json({
        status: 'success',
    });
});
exports.VeriferCodeSMS = catchAsync(async (req, res, next) => {
    if (!req.body.phonenumber && !req.body.code) {
        return next(new AppError('كود تنحى!عاود...', 400));
    }

    // const verifercode = await client.verify
    //     .services(process.env.TWILIO_SERVICE_ID)
    //     .verificationChecks.create({
    //         to: `+${req.body.phonenumber}`,
    //         code: req.body.code,
    //     });

    const user = await User.findOneAndUpdate(
        { phonenumber: req.body.phonenumber },
        { active: true }
    );
    // console.log(user);
    if (verifercode.status === 'approved') {
        res.status(200).send({
            message: 'مرحبا بيك كونت مقبول!',
        });
    } else {
        res.status(400).send({
            message: 'لازمك نكنفرمي الكونت!!',
        });
    }
});
exports.protect = catchAsync(async (req, res, next) => {
    // 1) Getting token and check of it's there
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
        // console.log(token);
    }
    // else if (req.cookies.jwt) {
    //     token = req.cookies.jwt;
    // }

    if (!token) {
        return next(
            new AppError('You are not logged in! Please log in to get access.', 403)
        );
    }

    // 2) Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
        return next(
            new AppError(
                'The user belonging to this token does no longer exist.',
                401
            )
        );
    }

    // 4) Check if user changed password after the token was issued
    if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next(
            new AppError('User recently changed password! Please log in again.', 401)
        );
    }

    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    res.locals.user = currentUser;
    next();
});

// Only for rendered pages, no errors!
exports.isLoggedIn = async (req, res, next) => {
    if (req.cookies.jwt) {
        try {
            // 1) verify token
            const decoded = await promisify(jwt.verify)(
                req.cookies.jwt,
                process.env.JWT_SECRET
            );

            // 2) Check if user still exists
            const currentUser = await User.findById(decoded.id);
            if (!currentUser) {
                return next();
            }

            // 3) Check if user changed password after the token was issued
            if (currentUser.changedPasswordAfter(decoded.iat)) {
                return next();
            }

            // THERE IS A LOGGED IN USER
            res.locals.user = currentUser;
            return next();
        } catch (err) {
            return next();
        }
    }
    next();
};

exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        // roles ['admin', 'lead-guide']. role='user'
        // console.log(req.user.role);
        if (!roles.includes(req.user.role)) {
            return next(
                new AppError('You do not have permission to perform this action', 403)
            );
        }

        next();
    };
};
exports.renvoi = catchAsync(async (req, res, next) => {
    // 1) Get user based on POSTed email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new AppError('There is no user with email address.', 402));
    }

    // 2) Generate the random reset token

    const resetToken = user.createTokenInscription();
    await user.save({ validateBeforeSave: false });

    // 3) Send it to user's email
    try {
        await new Email(user, resetToken).confirmInscription();

        res.status(200).json({
            status: 'success',
            message: 'Token sent to email!',
        });
    } catch (err) {
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({ validateBeforeSave: false });

        return next(
            new AppError('There was an error sending the email. Try again later!'),
            500
        );
    }
});
exports.forgotPassword = catchAsync(async (req, res, next) => {
    // 1) Get user based on POSTed email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new AppError('There is no user with email address.', 404));
    }

    // 2) Generate the random reset token
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    // 3) Send it to user's email
    try {
        await new Email(user, resetToken).sendPasswordReset();

        res.status(200).json({
            status: 'success',
            message: 'Token sent to email!',
        });
    } catch (err) {
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({ validateBeforeSave: false });

        return next(
            new AppError('There was an error sending the email. Try again later!'),
            500
        );
    }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
    // 1) Get user based on the token
    // console.log('body',req.body);
    var hashedToken = crypto
        .createHash('sha256')
        .update(req.body.token)
        .digest('hex');

    var user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() },
    });

    // 2) If token has not expired, and there is user, set the new password
    if (!user) {
        return next(new AppError('Token is invalid or has expired', 400));
    }
    user.password = req.body.user.password;
    user.passwordConfirm = req.body.user.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    // 3) Update changedPasswordAt property for the user
    // 4) Log the user in, send JWT
    createSendToken(user, 200, req, res);
});
exports.confirmInscription = catchAsync(async (req, res, next) => {
    // 1) Get user based on the token
    // console.log(req.body);
    const hashedToken = crypto
        .createHash('sha256')
        .update(req.body.token)
        .digest('hex');

    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() },
    });

    // 2) If token has not expired, and there is user, set the new password
    if (!user) {
        return next(new AppError('Token is invalid or has expired', 400));
    }

    user.active = true;
    // console.log(user);
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    res.status(200).json({
        status: 'success',
    });
});
exports.updatePassword = catchAsync(async (req, res, next) => {
    // 1) Get user from collection
    const user = await User.findById(req.user.id).select('+password');

    // 2) Check if POSTed current password is correct
    if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
        return next(new AppError('Your current password is wrong.', 401));
    }

    // 3) If so, update password
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    await user.save();
    // User.findByIdAndUpdate will NOT work as intended!

    // 4) Log user in, send JWT
    createSendToken(user, 200, req, res);
});
