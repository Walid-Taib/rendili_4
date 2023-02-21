const mongoose=require('mongoose');
const Schema=mongoose.Schema
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new Schema({
    email:   {
        type: String,
    },
    city:{
        type:String
    },
    skills:{
        type:String
    },
    description:{
        type:String
    },
    experience:{
        type:String
    },
    companyCondition:{
        type:Boolean,
        default:false
    },
    jobs:[{
        type:Schema.Types.ObjectId,
        ref:'Job'
    }],
    savedJob:[{
        type:Schema.Types.ObjectId,
        ref:'Job'
    }],

    facebookId: String,

});

UserSchema.plugin(passportLocalMongoose);
const User=mongoose.model('User',UserSchema);
module.exports=User;