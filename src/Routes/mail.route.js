
const Sendmail = require('../controllers/Sendmail');

const router = require('express').Router();

router.post('/sendmail', Sendmail.send_File)
router.post('/sendmsg', Sendmail.Profile_Contact)




module.exports = router;