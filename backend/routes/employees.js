const express = require('express');
const router = express.Router();

const employeesApiCtrl = require('../controllers/employeeApiCtrl');

//GET all employees
router.get("/", employeesApiCtrl.getAll);

// GET a particular employee
router.get("/:guid", employeesApiCtrl.get);


//GET filtered employees
// router.get("", employeesApiCtrl.filterEmp);

// POST create an employee
router.post("/", employeesApiCtrl.create);

// PUT update employee details
router.put("/:guid", employeesApiCtrl.edit);

// DELETE delete employee
router.delete("/:guid", employeesApiCtrl.delete);


module.exports = router;