const mongoose=require('mongoose');
const Schema =mongoose.Schema;
const Jobschema=new Schema({
    position:{
        type:String,
    },
    typeOfJob:{
        type:String,
    },
    description:{
        type:String
    },
    tasks:{
        type:String
    },
    skills:{
        type:String
    },
    salaryMin:{
        type:String
    },
    salaryMax:{
        type:String
    },
    city:{
        type:String
    },
    company:{
        type:Schema.Types.ObjectId,
        ref:'User'
    }
},{timestamps:true})

const Job =mongoose.model('Job', Jobschema);
module.exports=Job;