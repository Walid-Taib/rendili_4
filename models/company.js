const mongoose=require('mongoose');
const Schema =mongoose.Schema;
const CompanySchema =new Schema({
    name:{
        type:String,
        unique:true,
        required:true,
    }
    ,city:{
        type:String,
        required:true
    },
    position:{
        type:String,
        required:true

    },
    typeOfJob:{
        type:String,
        required:true
    },
    description:{
        type:String,
    },
    skills:{
        type:String
    },
    tasks:{
        type:String
    }

},{timestamps:true})
const Company=mongoose.model('Company',CompanySchema);
module.exports=Company;