//Connect mongodb 
const mongo = require('mongoose');
require('dotenv').config();
const connectDb = process.env.DATABASE_URL; 
function connect(){
    if (!connectDb) {
        console.error("DATABASE_URL is not defined");
        return;
    }
    mongo.connect(connectDb, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Database connected");
    })
    .catch((error) => {
        console.error("Database connection error:", error);
    });
}
module.exports = connect;