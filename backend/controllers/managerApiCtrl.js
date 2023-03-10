const DataAccessObject = require("../data-access/manager-data-access");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

exports.getMan = (req, res) => {
  const id = req.params.guid;
  DataAccessObject.getManager(id)
    .then((result) => {
      res
        .status(200)
        .json({ data: result, message: "Manager fetch successfull!" });
    })
    .catch((err) => {
      res.status(500).json({ data: null, message: "Manager fetch error!" });
    });
};
