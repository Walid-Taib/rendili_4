const express=require('express');
const { verifyUser, verifyCompany } = require('../authenticate');
const Job = require('../models/job');
const User = require('../models/user');
const CompanyRouter=express.Router();
const cors=require('cors')
CompanyRouter.route('/')


// send all the information about the company including the jobs offers
.get(cors() , (req,res,next)=>{
  User.findById(req.user._id)
  .populate('jobs')
  .then((resp)=>{
      res.statusCode=200;
      res.setHeader('Content-Type','application/json');
      res.json(resp)
  },(err)=>next(err))
  .catch((err)=>next(err))
})



.post((req,res,next)=>{
  res.statusCode=404;
  res.send('Operation is not available');


  // edit the information of the company
}).put(verifyUser,verifyCompany, (req,res,next)=>{

  User.findByIdAndUpdate(req.user._id),{
    $set:req.body
  },{new:true}
  .then((resp)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','applications/json');
    res.json(resp)
  })

})

.delete(cors(), verifyUser,verifyCompany, (req,res,next)=>{
  User.findByIdAndRemove(req.user._id)
  .then((resp)=>{
    res.statusCode=200;
    res.setHeader('Content-Type', 'application/json');
    res.json(resp)
  })
})





module.exports=CompanyRouter;

