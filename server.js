const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const fileupload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');
const error = require('./middleware/error');
const connectDB = require('./config/db');
const logger = require('./middleware/logger')

//load env variables
dotenv.config({path: './config/config.env'});

//connect to db
connectDB();

//middleware

//const error = require('./middleware/error')

// routes files
const bootcamps  = require('./routes/bootcamps');
const courses  = require('./routes/courses');
const auth  = require('./routes/auth');
const user  = require('./routes/user');
const reviews  = require('./routes/reviews');

// initialize app
const app = express();

// body parser
app.use(express.json());

//cookie parser
app.use(cookieParser());


// Dev logging middleware
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}
app.use(logger)

// File uploading
app.use(fileupload());

// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100
});
app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(cors());

//Set static folder
app.use(express.static(path.join(__dirname, 'public')))


// Mount Routers
app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);
app.use('/api/v1/auth', auth);
app.use('/api/v1/user', user);
app.use('/api/v1/reviews', reviews);
app.use(error)



const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`.green.bold)
});

//Handle unhandle promise rejection
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red)
    server.close(() => process.exit(1));
});

