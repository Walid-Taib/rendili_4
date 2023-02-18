const express=require('express');
const { verifyUser } = require('../authenticate');
const Job = require('../models/job');
const User = require('../models/user');
const savedJob=express.Router();



savedJob.route('/')
.get(verifyUser,(req,res,next)=>{
    User.findById(req.user._id)
    .populate('savedJob')
    .then((resp)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(resp)
    })
})
.post((req,res,next)=>{
    User.findByIdAndUpdate(req.user._id,{
        $set:req.body
    },{new:true})
    .then((resp)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(resp)
    })
})

module.exports=savedJob;