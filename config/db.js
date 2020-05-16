const mongoose = require('mongoose')

// const url = process.env.MONGO_URI

const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URI,  {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });

    console.log(`MongoDB Connected : ${conn.connection.host}`.bgCyan.bold)
}

module.exports = connectDB ;