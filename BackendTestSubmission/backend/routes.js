const express = require("express");
const router = express.Router();
router.get("/get",(req, res)=>{
    return res.json({
        message:"server is run .....",
        data:"working"
    })
})

router.post("/post",(req, res)=>{
    console.log("hello ..........")
    return res.json({
        message:"server is run .....",
        data:req.body.data
    })

})
module.exports=router;