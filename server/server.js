const express = require('express');
require('./db')
const app = express();
var router = express.Router();
app.use(express.urlencoded({extended:true}));
app.use(express.json());
const cors = require('cors');
app.use(cors());
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId
mongoose.connect('mongodb://localhost:27017/EmployeeDB',{useNewUrlParser:true},(err)=>{
    if (!err){console.log('MongoDb connection succeeded.')}
    else{console.log('Error in DB connection: '+err)}
});

app.listen(3000,()=>{
    console.log('Server is running at port : 3000')
})
const Employee = mongoose.model('Employee')
app.get('/list',(req,res)=>{
    Employee.find((err,docs)=>{
        if(!err){
            res.send(docs)
        }else{
            console.log('Error in retrieving employees list :'+err)
        }
       
    })
});


app.post('/',(req,res)=>{
    
    if(req.body._id == null || req.body._id == ''){
        insertrecord(req,res);
    }
    else
        updaterecord(req,res);
    
})

function insertrecord(req,res){
    var employee = new Employee();
    employee.fullName = req.body.fullName;
    employee.email = req.body.email;
    employee.mobile = req.body.mobile;
    employee.city = req.body.city;
    employee.save((err,doc)=>{
        if(!err){
        res.send('success');
        }
        else{
            console.log('Error during record insertion :'+err);
        }
    });
}
function updaterecord(req,res){
    
    Employee.findOneAndUpdate({_id: req.body._id},req.body,{new:true},(err,doc)=>{
        if(!err){
            res.redirect('employee/list');
        }else{
            res.redirect("employee/addoredit",{
                viewTitle:'Update Employee',
                employee:req.body
            })
        }
    });
}

app.delete('/delete/:id',(req,res)=>{
    Employee.findOneAndDelete({_id:ObjectId(req.params.id)},(err,doc)=>{
        if(!err){
            res.send('')
        }else{
            console.log('Error in employee delete :'+ err)
        }
    });
})