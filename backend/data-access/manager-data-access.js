const Manager = require("../models/manager");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

module.exports = class ManagerDataAccessObject {
  static async getManager(_id) {
    return new Promise(async (resolve, reject) => {
      try {
        const manager = await Manager.findOne({ empid: _id });
        resolve(manager.manname);
      } catch (error) {
        reject(null);
      }
    });
  }
};
