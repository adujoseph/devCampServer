const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const fileupload = require('express-fileupload')
const connectDB = require('./config/db')
const cookieParser = require('cookie-parser');

//middleware
const logger = require('./middleware/logger')
const error = require('./middleware/error')

//load env variables
dotenv.config({path: './config/config.env'});
//connect to db
connectDB();

// routes files
const bootcamps  = require('./routes/bootcamps');
const courses  = require('./routes/courses');
const auth  = require('./routes/auth');


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

//Set static folder
app.use(express.static(path.join(__dirname, 'public')))


// Mount Routers
app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);
app.use('/api/v1/auth', auth);
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

