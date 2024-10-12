const mongoose = require('mongoose'); 
const user = new mongoose.Schema({
    username: {
        require: true, 
        type: String
    }, 
    password: {
        require: true,
        type: String
    },
    image: {
        type: String
    }
});
module.exports = mongoose.model('auth_basic', user);
