const DataAccessObject = require("../data-access/department-data-access");

exports.getAll = (req,res) => {
    DataAccessObject.getAllDepartments().then((result) => {
        res.status(200).json({data: result, message: "Successful!" });
    }).catch((error) => {
        res.status(500).json({data: null, message: "Error!" })
    })
}

exports.create = (req,res) => {
    let {id, name} = req.body
    let department = {id:parseInt(id), name}
    DataAccessObject.createDepartment(department).then((result) => {
        res.status(200).json({data: result, message: "Successful!" })
    }).catch((error) => {
        res.status(500).json({data: null, message: "Error!" })
    })
}