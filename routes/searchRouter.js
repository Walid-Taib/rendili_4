const express=require('express');
const search=express.Router();
const bodyParser=require('body-parser');
search.use(bodyParser.json());
const Company=require('../models/company');


search.route('/')
.post((req,res,next)=>{
  query={}
  if(req.body.city){
    query.city=req.body.city
  }
  if(req.body.typeOjob){
    query.typeOjob=req.body.typeOjob
  }
  if(req.body.position){
    query.position=req.body.position;
    query = { ...query, position: { $regex: req.body.position, $options: "i" } };

  }


  Company.aggregate([{$match:query}])
  .then((resp)=>{
    res.statusCode=200;
    res.setHeader("Content-Type","application/json");
    res.json(resp);
  })
})
search.route('/keyword')
.post((req,res,next)=>{
  Company.find()
})

module.exports=search;


