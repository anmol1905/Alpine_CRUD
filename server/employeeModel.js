const mongoose = require('mongoose')
var employeeSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    mobile:{
        type:String
    },
    city:{
        type:String
    }
});
mongoose.model('Employee',employeeSchema)
