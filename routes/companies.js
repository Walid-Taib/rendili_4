const express=require('express');
const { verifyUser } = require('../authenticate');
const Job = require('../models/job');
const Jobrouter=express.Router();

Jobrouter.route('/')
.get(verifyUser, (req,res,next)=>{
  Job.findOne({company:req.user._id})
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

module.exports=Jobrouter;