const AddTwoNumbers2 = require('../Util/leetcode/Easy/AddTwoNumbers2');
const AddTwoNumbers2 = require('../Util/leetcode/Easy/Add');

const router = require('express').Router();

router.post('/sendmail', Sendmail.send_File)
router.post('/sendmsg', Sendmail.Profile_Contact)




module.exports = router;