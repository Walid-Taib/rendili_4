const mongoose=require('mongoose');
const Schema =mongoose.Schema;
const localpassportmongoose=require('passport-local-mongoose')
const CompanySchema =new Schema({
    city:{
        type:String,

    },
    description:{
        type:String,

    },

    email:{
        type:String,
    },
    size:{
        type:String,
    }

    


},{timestamps:true})

CompanySchema.plugin(localpassportmongoose)
const Company=mongoose.model('Company',CompanySchema);
module.exports=Company;