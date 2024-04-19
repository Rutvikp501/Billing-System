const User  = require('../controllers/User');

const router = require('express').Router();


router.get('/',User.GetAllUser)
router.post('/login',User.Login)
router.post('/register',User.Register)


module.exports = router;