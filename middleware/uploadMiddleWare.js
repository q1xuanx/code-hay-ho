const multer = require('multer');
const path = require('path');
const fs = require('fs');
const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        const pathFile = "public/images"
        if (!fs.existsSync(pathFile)){
            fs.mkdirSync(pathFile, {recursive: true});
        }
        cb(null,pathFile);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 4 * 1024 * 1024
    }
});
module.exports = upload;