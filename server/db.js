const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/EmployeeDB',{useNewUrlParser:true},(err)=>{
    if (!err){console.log('MongoDb connection succeeded.')}
    else{console.log('Error in DB connection: '+err)}
});
require('./employeeModel')