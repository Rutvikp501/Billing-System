const Salary  = require('../controllers/Salary_caculation.controller');

const router = require('express').Router();
router.post('/calculateHikePercentage', Salary.calculateHikePercentage)
router.post('/calculateNewSalary', Salary.calculateNewSalary)


module.exports = router;