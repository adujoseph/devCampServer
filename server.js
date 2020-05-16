const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors')
const connectDB = require('./config/db')

// routes files
const bootcamps  = require('./routes/bootcamps')

//middleware
const logger = require('./middleware/logger')

dotenv.config({path: './config/config.env'});

const app = express();

const PORT = process.env.PORT || 5000;

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

connectDB();
app.use(logger)
app.use('/api/v1/bootcamps', bootcamps);


const server = app.listen(PORT, () => {
    console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`.green.bold)
});

//Handle unhandle promise rejection
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red)
    server.close(() => process.exit(1));
});
