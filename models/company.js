const mongoose=require('mongoose');
const Schema =mongoose.Schema;
const localpassportmongoose=require('passport-local-mongoose')
const CompanySchema =new Schema({
    name:{
        type:String,
        unique:true,
    }
    ,city:{
        type:String,
    },
    position:{
        type:String,

    },
    description:{
        type:String,
    },
    email:{
        type:String,
        required:true
    }
    


},{timestamps:true})

CompanySchema.plugin(localpassportmongoose)
const Company=mongoose.model('Company',CompanySchema);
module.exports=Company;