const mongoose = require('mongoose');
const localpassportmongoose=require('passport-local-mongoose')
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true
  },
  companies:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Company'
  }]
});userSchema.plugin(localpassportmongoose)


const User = mongoose.model('User', userSchema);
module.exports=User