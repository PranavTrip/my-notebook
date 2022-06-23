const express=require('express');
const router=express.Router();

router.get('/',(req,res)=>{
    res.send('Notes API');
})

module.exports=router;