const mongoose=require('mongoose');
const Schema=mongoose.Schema
var passportLocalMongoose = require('passport-local-mongoose');


const userSchema = new mongoose.Schema({
    email: {
      type: String,
      unique: true
    },
    username: {
      type: String,
      unique: true
    },
    
  });
  
  // Add passport-local-mongoose plugin to User schema
 const User= userSchema.plugin(passportLocalMongoose);
module.exports=mongoose.model('User',User);