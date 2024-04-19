const createcron  = require('../controllers/cron.controller');

const router = require('express').Router();
router.get('/create', createExcel)


module.exports = router;