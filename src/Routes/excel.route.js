const createExcel  = require('../controllers/excel.controller');

const router = require('express').Router();
router.get('/create', createExcel.Excel_Creation_format)


module.exports = router;