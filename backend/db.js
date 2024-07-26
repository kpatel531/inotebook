const mongoose = require('mongoose');

const mongoURI = "mongodb://127.0.0.1:27017/inotebook?readPreference=primary&appName=MongoDB%20Compass&directConnection=true&ssl=false";

const connectToMongo = () => {
    mongoose.connect(mongoURI);
    mongoose.connection.on('connected', function () {  
        console.log('Database connected successfully');
    }); 
}


module.exports = connectToMongo;