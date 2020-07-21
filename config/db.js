const mongoose = require('mongoose');

const connectDB = async () => {
    console.log(process.env.MONGO_URI);
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false  
        });
        console.log(`MongoDB Connected : ${conn.connection.host}`.bgCyan.bold)
    } catch(err){
        console.log('mongo error: ', err)
    }

}

module.exports = connectDB;