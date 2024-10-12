const express = require('express'); 
const router = express.Router();
const userModel = require('../models/user');
module.exports = router;
router.post('/login', async (req, res) => {
    const {username, password} = req.body;
    let isExist = await userModel.findOne({username, password});
    if (isExist){
        res.status(200).json({message: "Success login"});
    }else {
        res.status(200).json({message: "Login fail"});    
    }
});

router.get("/register", (req, res) => {
    return res.render("../views/register.ejs");
})
router.get("/login", (req, res) => {
    const currentTime = new Date().toUTCString();
    return res.render("../views/login.ejs", {time: currentTime});
})

router.post('/register', async(req, res) => {
    const {username, password} = req.body;
    if (username == "undefined" || username == ""){
        res.status(404).json({message: "username not found!"});
    }else if (username == "undefined" || username == ""){
        res.status(404).json({message: "password not found!"});
    }else {
        let created = new userModel({
            username: username, 
            password: password
        });
        const saved = await created.save();
        if (saved){
            res.status(200).json({message: "save success", data: saved});
        }else {
            res.status(400).json({message: "error while save"});
        }
    }
});

