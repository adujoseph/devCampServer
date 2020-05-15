const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

// routes files
const bootcamps  = require('./routes/bootcamps')

//middleware
const logger = require('./middleware/logger')

dotenv.config({path: './config/config.env'});

const app = express();

const PORT = process.env.PORT || 5000;



app.use(logger)
app.use('/api/v1/bootcamps', bootcamps);


app.listen(PORT, () => {
    console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
});
