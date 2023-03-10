const DataAccessObject = require("../data-access/employee-data-access");
const mongoose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId


exports.getAll = (req, res) => {
    DataAccessObject.getAllEmployees().then(result => {
        res.status(200).json({data: result, message: "Successful!" });
    }).catch(error => {
        res.status(500).json({data: null, message: "Error!" });
    });
}

exports.get = (req, res) => {
    var _id = req.params.guid;
    // console.log(_id)
    if(!ObjectId.isValid(_id)){
        res.status(500).json({data: null, message: "Not a valid employee ID"})
    }
    DataAccessObject.getEmployee(_id).then(result => {
        // console.log(result);
        if(!result){
            res.status(500).json({data:null, message: "No employee found"});
            return;
        }
        res.status(200).json({data: result, message: "Successful" });
    }, eMsg => {
        res.status(500).json({data: null, message: "Error" });
    });
}

exports.create = async (req, res) => {
    var { id, name, department, salary, designation, languages,gender,state, bloodgroup,age,modeOfOffice,manid } = req.body;
    if(!manid){
        manid = null
    }
    var employee = { id: parseInt(id), name, department, salary: parseInt(salary),designation,languages,gender,state,bloodgroup,age:parseInt(age),modeOfOffice};

    DataAccessObject.createEmployee(employee,manid).then((result) => {
        if(typeof result !== "object" || result.errors){
            throw new Error(result)
        }
        res.status(201).json({data: result, message: "Successful!" });
    }).catch((error) => {
        res.status(500).json({data: null, message: `Error!${error}` });
    })
}

exports.edit = (req, res) => {
    var _id = req.params.guid;
    var {id,name,department, salary,designation,languages,gender,state,bloodgroup,age,modeOfOffice,manid} = req.body;
    if(!manid){
        manid = null
    }
    var employee = {}
    if(id) employee.id = parseInt(id);
    if(name) employee.name = name;
    if(department) employee.department = department
    if(salary) employee.salary = parseInt(salary)
    if(designation) employee.designation = designation
    if(languages) employee.languages = languages
    if(gender) employee.gender = gender
    if(state) employee.state = state
    if(bloodgroup) employee.bloodgroup = bloodgroup
    if(age) employee.age = age
    if(modeOfOffice) employee.modeOfOffice = modeOfOffice
    console.log(employee)
    // var employee = { id: parseInt(id), name, department, salary: parseInt(salary),designation,languages,gender,state,bloodgroup,age:parseInt(age),modeOfOffice };

    DataAccessObject.updateEmployee(_id, employee,manid).then(result => {
        // console.log(typeof result)
        // console.log(result)
        if(result === null){
            res.status(500).json({data: null, message: "Employee does not exist"})
        }
        else if(typeof result !== "object" || result.errors){
            throw new Error(result)
        }
        else{
            res.status(200).json({data: result, message: "Successful!" });
        }
        
    }).catch(error => {
        res.status(500).json({data: null, message: `Error!${error}` });
    });
}

exports.delete = (req, res) => {
    var _id = req.params.guid;
    if(!ObjectId.isValid(_id)){
        res.status(500).json({data: null, message: "Not a valid employee object ID"})
    }
    DataAccessObject.deleteEmployee(_id).then(result => {
        if(!result){
            throw new Error("Employee to be deleted does not exist")
        }
        // console.log(result)
        res.status(200).json({data: null, message: "Successful!" });
    }).catch(error => {
        res.status(500).json({data: null, message: `Error!${error}` });
    });
}

exports.filterEmp = (req,res) => {
    const query = req.query;
    console.log(query)
    DataAccessObject.filterEmployees(query).then(result => {
        if(!result){
            return res.status(500).json({data: null, message: "Department Id Invalid"})
        }
        if(result.length == 0){
            return res.status(500).json({data:null, message:"Employees not found"})
        }
        // else if(result)
        res.status(200).json({data: result, message: "Successful!"})
    }).catch(error => {
        res.status(500).json({data: null, message: "Error!"})
    })
}

exports.hierarchy = (req,res) => {
    const _id = req.params.guid
    DataAccessObject.hierarchyEmployee(_id).then((result) => {
        res.status(200).json({data:result, message: "Hierarchy fetched!"})
    }).catch(error => {
        res.status(500).json({data:null, message:"Error!"})
    })
}

