const mongoose = require("mongoose")

const Schema = mongoose.Schema

const managerSchema = Schema({
    empid:{
        type:mongoose.Types.ObjectId,
        required:true,
    },
    empname:{
        type:String,
        required:true
    },
    manid:{
        type:mongoose.Types.ObjectId,
        required:true,
    },
    manname:{
        type:String,
        required:true
    }
})

module.exports = Manager = mongoose.model("Manager", managerSchema)
