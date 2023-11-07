const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');


const AppError = require('./src/utils/appError');
const globalErrorHandler = require('./src/controllers/errorController');
// const tourRouter = require('./src/routes/tourRoutes');
const userRouter = require('./src/routes/userRoutes');
const stationsRouter = require('./src/routes/stationsRoutes');
// const bookingRouter = require('./src/routes/bookingRoutes');
// const bookingController = require('./src/controllers/bookingController');
// const viewRouter = require('./src/routes/viewRoutes');
// const postRouter = require('./src/routes/postRoutes');
// Start express app
const app = express();

app.enable('trust proxy');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// 1) GLOBAL MIDDLEWARES
// Implement CORS
app.use(cors());

app.options('*', cors());
// app.options('/api/v1/tours/:id', cors());

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Limit requests from same API
// const limiter = rateLimit({
//   max: 100,
//   windowMs: 60 * 60 * 1000,
//   message: 'Too many requests from this IP, please try again in an hour!'
// });
// app.use('/api', limiter);

// Stripe webhook, BEFORE body-parser, because stripe needs the body as stream
// app.post(
//     '/webhook-checkout',
//     bodyParser.raw({ type: 'application/json' }),
//     bookingController.webhookCheckout
// );

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
// app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());
app.use(compression());
// Test middleware
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    console.log('app', req.body);

    next();
});



// 3) ROUTES
// app.use('/', viewRouter);
// app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/stations', stationsRouter);
// app.use('/api/v1/bookings', bookingRouter);
// app.use('/api/v1/posts', postRouter);

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
