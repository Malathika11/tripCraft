const express=require("express");

const router=express.Router();

router.post("/",(req,res)=>{

    console.log(req.body);

    res.json({
        status:true,
        message:"Verification Submitted"
    });

});

module.exports=router;