const express = require('express');
const router = express.Router();
const userModel = require("../models/user");
const upload = require("../middleware/uploadMiddleWare");
const path = require('path');
module.exports = router;
router.get("/search", async (req, res) => {
    return res.render("../views/search.ejs");
})

router.get("/get-data", async (req, res) => {
    const page = req.query.page; 
    const limit = req.query.limit
    const skip = (page - 1) * limit; 
    const listUser = await userModel.find().skip(skip).limit(limit);
    const totalDoc = await userModel.countDocuments();
    const totalPage = Math.ceil(totalDoc / limit);
    return res.status(200).json({message: "Success", data: listUser, totalPage: totalPage})
});
router.post("/search", async (req, res) => {
    const userName = req.body.username; 
    const isExist = await userModel.findOne({username: userName}); 
    console.log(isExist);
    if (isExist){
        var randomString = Math.random().toString(36).slice(-8);
        isExist.password = randomString;
        isExist.save();
        return res.status(200).json({message: "find success", data: isExist});
    }
    return res.status(404).json({message: "Not found"});
});
router.post("/upload", upload.single('file'), async (req, res) => {
    if (!req.file) return res.status(404).json({message: "File not found"});
    if (!req.body.username) return res.status(404).json({message: "Please enter username"});
    let user = await userModel.findOne({username: req.body.username});
    console.log(user);
    if (!user){
        return res.status(404).json({message: "Username not found"});
    }
    const pathFile = path.join(__dirname + '/public/images/' + req.file.filename);
    const parts = pathFile.split('\\');
    const fileNameWithExt = parts[parts.length - 1];
    user.image = fileNameWithExt;
    await user.save();
    const listData = await userModel.find();
    return res.status(200).json({message: "Upload success", data: listData});
})