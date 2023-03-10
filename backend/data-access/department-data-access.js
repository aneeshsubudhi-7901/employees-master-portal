const Department = require('../models/department');


module.exports = class DepartmentDataAccessObject {
    static async getAllDepartments(){
        try {
            const departments = await Department.find();
            return departments;
        } catch (error) {
            console.log(`Not able to fetch departments ${error}`);
        }
    }
    static async createDepartment(department){
        try {
            const dept = await new Department(department).save();
            return dept;
        } catch (error) {
            console.log(`Not able to create employee ${error}`);
        }
    }
}