const express=require('express');
const search=express.Router();
const bodyParser=require('body-parser');
search.use(bodyParser.json());
const Company=require('../models/company');
const cors=require('cors')
const authenticate=require('../authenticate')
search.route('/')
.post(cors(),(req,res,next)=>{
  query={}
  if(req.body.city){
    query.city=req.body.city
  }
  if(req.body.typeOfJob){
    query.typeOfJob=req.body.typeOfJob
  }
 


  if(req.body.key){
    query.position=req.body.key;
    query = { ...query, position: { $regex: req.body.key, $options: "i" } };
  }
  if(req.body.key2){
    query.name=req.body.key2;
    query = { ...query, name: { $regex: req.body.key2, $options: "i" } };
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


