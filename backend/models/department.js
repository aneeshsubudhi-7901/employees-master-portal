const mongoose = require("mongoose")

const Schema = mongoose.Schema

const departmentSchema = Schema({
    id:{
        type:Number,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true,
    },
})

module.exports = Department = mongoose.model("Department", departmentSchema)
