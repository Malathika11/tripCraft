const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const uploadPath = path.join(__dirname, "../uploads");

if(!fs.existsSync(uploadPath)){
    fs.mkdirSync(uploadPath, {recursive : true});
}

const storage = multer.diskStorage({
    destination(req,file,cb){
        cb(null,"uploads/");
    },
    filename(req,file,cb){
        cb(null,Date.now()+"-"+file.originalname);
    }
});
const upload = multer({storage});
router.post("/",upload.single("file"),(req,res)=>{
    res.json({
        status:true,
        fileId:req.file.filename,
        fileName:req.file.originalname,
        size:req.file.size,
        path:req.file.path
    });
});
module.exports=router;