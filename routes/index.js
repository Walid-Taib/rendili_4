const express=require('express');
const router=express.Router();
const bodyParser=require('body-parser');
router.use(bodyParser.json());
var authenticate = require('../auth');
var passport = require('passport');

var cors=require('cors')
const Company=require('../models/company');
router.post('/signup', (req, res, next) => {
  Company.register(new Company({username: req.body.username}), 
    req.body.password, (err, user) => {
    if(err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({err: err});
    }
    else {
      passport.authenticate('local')(req, res, () => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({success: true, status: 'Registration Successful!'});
      });
    }
  });
});

router.post('/login',authenticate.modifyRequestBody, passport.authenticate('local'), (req, res) => {

  var token = authenticate.getToken({_id: req.user._id});
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({success: true, token: token, status: 'You are successfully logged in!'});
});



router.post('/save/:id',cors(), (req, res) => {
  const id = req.params.id;
  const companies = req.body.companies ;

  User.updateOne({ _id: id }, { $push: { companies: companies  } }, (error) => {
    if (error) {
      return res.status(400).send({ error: error.message });
    } else {
      return res.send({ message: 'Value added successfully' ,success:true});
    }
  });
});



router.get(('/user'),cors(), (req,res,next)=>{
  User.find()
  .populate('companies')
  .then((companies)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','application/json');
    res.json(companies)
  },(err)=>next(err))
  .catch((err)=>next(err))
})
router.get('/facebook/token', passport.authenticate('facebook-token'), (req, res) => {
  if (req.user) {
    var token = authenticate.getToken({_id: req.user._id});
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({success: true, token: token, status: 'You are successfully logged in!'});
    console.log(token)
  }
});

router.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  }
  else {
    var err = new Error('You are not logged in!');
    err.status = 403;
    next(err);
  }
});

module.exports = router;
