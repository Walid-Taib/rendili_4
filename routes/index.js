const express=require('express');
const router=express.Router();
const bodyParser=require('body-parser');
router.use(bodyParser.json());
var authenticate = require('../auth');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

const Company = require('../models/company');
const User = require('../models/user');

router.post('/signup', (req, res, next) => {
  const { username, password, city } = req.body;
  let strategy, Model;
  
  // Determine which model and strategy to use based on the city
  if (req.body.city) {
    strategy = new LocalStrategy(Company.authenticate());
    Model = Company;
  } else {
    strategy = new LocalStrategy(User.authenticate());
    Model = User;
  }
  
  passport.use(strategy);
  passport.serializeUser(Model.serializeUser());
  passport.deserializeUser(Model.deserializeUser());

  Model.register(new Model({username}), password, (err, user) => {
    if(err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({err: err});
    }
    else {
      passport.authenticate(strategy)(req, res, () => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({success: true, status: 'Registration Successful!'});
      });
    }
  });
});


module.exports=router;