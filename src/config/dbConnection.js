const mongoose = require("mongoose");
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=> {
    console.log("Db connected successfully");
}).catch((error)=> {
    console.error("Error in DB connection", error);
})

module.exports = mongoose;
