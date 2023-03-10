const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeSchema = Schema({
    id: {
        type: Number,
        required: true,
        unique:true
    },

    name: {
        type: String,
        required: true,
        validate : [function validator(name){
            return name.length < 40
        }, "Name should be of most 40 characters."]
    },
    department: {
        // type:mongoose.Schema.Types.ObjectId,
        // ref:"Department",
        type:String,
        required:true,

    },
    designation: {
        type:String,
        required:true,
        // enum:{
        //     values:["SDE-1","SDE-2","SDE-3","Product Manager","Head"],
        //     message:"{VALUE} does not exist"
        // }
        validate: [
            function validator(desig){
                return ["SDE-1","SDE-2","SDE-3","Product Manager","Head"].includes(desig)
            },
            "Not a valid designation"
        ]
    },
    salary: {
        type:Number,
        required:true,
        validate: [
            function validator(salary){
                return salary > 5000 && salary < 70000
            },"Salary value should be >= 0."
        ]
    },
    gender: {
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    languages:{
        type:String,
        required:true
    },
    bloodgroup:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    modeOfOffice:{
        type:String,
        required:true
    },
}); 

module.exports = Employee = mongoose.model("Employee", employeeSchema);