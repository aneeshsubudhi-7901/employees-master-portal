const Employee = require("../models/employee");
const Manager = require("../models/manager");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

module.exports = class EmployeeDataAccessObject {
  static async getAllEmployees() {
    try {
      const employees = await Employee.find().populate("department");
      return employees;
    } catch (error) {
      console.log(`Not able to fetch employees ${error}`);
    }
  }

  static async getEmployee(recordId) {
    try {
      const employee = await Employee.findById({ _id: recordId }).populate(
        "department"
      );
      return employee;
    } catch (error) {
      console.log(`Not able to fetch employees ${error}`);
    }
  }

  static async createEmployee(employee, manid) {
    try {
      const response = await new Employee(employee).save(); //to save employee details
      if (manid !== null) {
        const manager = await Employee.findOne({ _id: ObjectId(manid) }); //to get details of the manager
        const manresponse = await new Manager({
          empid: response._id,
          empname: employee.name,
          manid: ObjectId(manid),
          manname: manager.name,
        }).save(); //to save employee and its manager details
      }
      return response;
    } catch (error) {
      console.log(`Not able to create employee ${error}`);
      return error;
    }
  }

  static async updateEmployee(recordId, employee, manid) {
    try {
      const opts = { runValidators: true };
      const updateResponse = await Employee.findOneAndUpdate(
        { _id: recordId },
        employee,
        opts
      );
      if (manid !== null) {
        const manager = await Employee.findOne({ _id: ObjectId(manid) });
        const updateManager = await Manager.findOneAndUpdate(
          { empid: recordId },
          { manid: ObjectId(manid), manname: manager.name },
          opts
        );
      }
      // console.log(updateResponse)
      return updateResponse;
    } catch (error) {
      console.log(`Not able to update employee ${error}`);
      return error;
    }
  }

  static async deleteEmployee(recordId) {
    try {
      const deletedResponse = await Employee.findOneAndDelete({
        _id: recordId,
      });
      console.log(deletedResponse);
      return deletedResponse;
    } catch (error) {
      console.log(`Not able to delete employee ${error}`);
    }
  }

  static async filterEmployees(query) {
    try {
      if (!query) {
        const filteredEmployees = await Employee.find().populate("department");
        console.log(filteredEmployees);
        return filteredEmployees;
      } else {
        const filteredEmployees = await Employee.find({ ...query }).populate(
          "department"
        );
        console.log(filteredEmployees);
        return filteredEmployees;
      }
    } catch (error) {
      console.log(`Not able to fetch employees ${error}`);
    }
  }

  static async hierarchyEmployee(recordId) {
    return new Promise(async (resolve, reject) => {
      try {
        let orgArr = [];
        let employee = await Employee.findById(recordId);

        while (employee) {
          orgArr.push({
            id: employee.id,
            name: employee.name,
            designation: employee.designation,
          });
          //   console.log();
          let manager = await Manager.findOne({ empid: employee._id });
          console.log(manager);
          if (!manager) {
            break;
          }
          employee = await Employee.findById(manager.manid);
        }
        orgArr.reverse();
        resolve(orgArr);
      } catch (err) {
        reject(null);
      }
    });
  }
};
