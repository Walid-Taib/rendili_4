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
    },
    city:{
        type:String
    }
<<<<<<< HEAD
} ,{timestamps:true})
=======
},{timestamps:true})
>>>>>>> dcb42e554c9070502527a977782dfae6669adeef

const Job =mongoose.model('Job', Jobschema);
module.exports=Job;