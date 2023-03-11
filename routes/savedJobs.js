const express=require('express');
const { verifyUser } = require('../authenticate');
const Job = require('../models/job');
const User = require('../models/user');
const savedJob=express.Router();

const cors=require('cors')

savedJob.route('/')
.get(cors(),verifyUser,(req,res,next)=>{
    User.findById(req.user._id)
    .populate('savedJob')
    .then((resp)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
    })
})
.post(cors(),verifyUser, (req,res,next)=>{
    User.findByIdAndUpdate(req.user._id,{
        $set:req.body
    },{new:true})
    .then((resp)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(resp)
    })
})
.put((req,res,next)=>{
    res.statusCode=404;
    res.send('Operation is not available');
})
.delete((req,res,next)=>{
    User.remove(savedJob)
    .then((resp)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','applicaiton/json');
        res.json(resp)
    })
})

module.exports=savedJob;