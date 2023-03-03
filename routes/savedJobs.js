const express=require('express');
const { verifyUser, verifyCompany } = require('../authenticate');
const Job = require('../models/job');
const User = require('../models/user');
const savedJob=express.Router();
const cors=require('cors')


savedJob.route('/')


.post(cors(),verifyUser,(req,res,next)=>{
    User.findByIdAndUpdate(req.user._id, { $set:req.body }, { new: true })
    .then((resp)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','applicaiton/json');
        res.json(resp)
    })


})
.put((req,res,next)=>{
    res.statusCode=404;
    res.send('Operation is not available');
})


module.exports=savedJob;