const express=require('express');
const companies=express.Router();
const bodyParser=require('body-parser');
companies.use(bodyParser.json());

const Company=require('../models/company');
companies.route('/')
.get((req,res,next)=>{
  Company.find()
  .then((companies)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','application/json');
    res.json(companies)
  },(err)=>next(err))
  .catch((err)=>next(err))
})
.post((req,res,next)=>{
  Company.create(req.body)
  .then((company)=>{
    res.statusCode=200
    res.setHeader('Content-Type','application/json');
    res.json(company)
  },(err)=>next(err))
  .catch((err)=>next(err))
})
.put((req,res,next)=>{
  res.statusCode=404;
  res.send('Operation is not available');
  console.log('Operation is not available');
})
.delete((req,res,next)=>{
  Company.deleteMany()
  .then((resp)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','application/json');
    res.json(resp)
  },(err)=>next(err))
  .catch((err)=>next(err))
})

companies.route('/:companyId')
.get((req,res,next)=>{
  Company.findById(req.params.companyId)
  .then((company)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','application/json');
    res.json(company)
  },(err)=>next(err))
  .catch((err)=>next(err));
})
.post((req,res,next)=>{
  res.statusCode=404;
  res.send('Operation is not available');
  console.log('Operation is not available');  res.send('Ope')
})
.put((req,res,next)=>{
  Company.findByIdAndUpdate(req.params.companyId,{
    $set:req.body
  },{new:true})
  .then((company)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','application/json');
    res.json(company);
  },(err)=>next(err))
  .catch((err)=>next(err))
})
.delete((req,res,next)=>{
  Company.findByIdAndRemove(req.params.companyId)
  .then((resp)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','applicaiton/json');
    res.json(resp)
  },(err)=>next(err))
  .catch((err)=>next(err))
})

module.exports=companies;