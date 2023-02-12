
const express=require('express');
const sort=express.Router();
const bodyParser=require('body-parser');
sort.use(bodyParser.json());
var authenticate = require('../authenticate');
var cors=require('cors')
const Company=require('../models/company');








sort.route('')
.get(cors(), (req,res,next)=>{
  Company.find().sort({createdAt:-1})
  .then((companies)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','application/json');
    res.json(companies)
  },(err)=>next(err))
  .catch((err)=>next(err))
})


module.exports=sort;