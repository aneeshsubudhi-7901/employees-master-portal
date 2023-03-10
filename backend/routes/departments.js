const express = require('express');
const router = express.Router();

const departmentApiCtrl = require('../controllers/departmentApiCtrl');

router.get("/",departmentApiCtrl.getAll)
router.post("/",departmentApiCtrl.create)

module.exports = router