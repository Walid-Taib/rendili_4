var express = require('express');
var router = express.Router();
const User=require('../models/user');
var passport = require('passport');
var authenticate = require('../authenticate');
const Company=require('../models/company');
const cors =require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || 'mysecretkey1234567890';

/* GET home page. */
router.post('/signup',cors(), async (req, res) => {
  const { email, username, password } = req.body;
  const user = new User({ email, username, password });

  try {
    await user.save();
    res.status(201).json({ message: 'User created' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/login',cors(), async (req, res) => {
  const { username, password } = req.body;
  let user;

  if (username.includes('@')) {
    user = await User.findOne({ email: username });
  } else {
    user = await User.findOne({ username: username });
  }

  if (!user) {
    return res.status(401).json({ message: 'User not found' });
  }

  try {
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    const token = jwt.sign({ id: user._id }, secret, {
      expiresIn: '1d'
    });
    User.aggregate([{$match:{$or:[{username:req.body.username},{email:req.body.email}]}}])
    .then((user)=>{
      res.status(200).json({message : 'user logged in ' ,token , success:true,user})
    })
     } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.post('/save/:id', (req, res) => {
  const id = req.params.id;
  const companies = req.body.companies ;

  User.updateOne({ _id: id }, { $push: { companies: companies } }, (error) => {
    if (error) {
      return res.status(400).send({ error: error.message });
    } else {
      return res.send({ message: 'Value added successfully' });
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
