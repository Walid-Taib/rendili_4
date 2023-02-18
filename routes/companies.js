const express=require('express');
const { verifyUser } = require('../authenticate');
const Job = require('../models/job');
const Jobrouter=express.Router();

Jobrouter.route('/')
.get(verifyUser, (req,res,next)=>{
  Job.find()
  .populate('company')
  .then((resp)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','application/json');
    res.json(resp)
  })
})
.post(verifyUser, (req,res,next)=>{
  req.body.company=req.user._id;
  Job.create(req.body)
  .then((resp)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','application/json')
    res.json(resp)
  })
})
.put((req,res,next)=>{
  res.statusCode=404;
  res.send('Operation is not available')
})
.delete(verifyUser, (req,res,next)=>{
  Job.findOne({company:req.user._id})
  .then((resp)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','application/json')
    res.json(resp)
  })
})
Jobrouter.route('/:job')
.get(verifyUser ,(req,res,next)=>{
  Job.findById(req.params.job)
  .populate('company')
  .then((job)=>{
    if(job ){
      res.statusCode=200;
      res.setHeader('Content-Type','application/json');
      res.json(job)
    }
    else{
      res.statusCode=200;
      res.send('the is no job ')
    }
  })
})
.put(verifyUser, (req,res,next)=>{
  Job.findByIdAndUpdate(req.params.job,{$set:req.body},{new:true})
  .then((resp)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','application/json');
    res.json(resp)
  })
})

module.exports=Jobrouter;