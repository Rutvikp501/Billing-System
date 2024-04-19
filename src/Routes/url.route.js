const shortUrl  = require('../controllers/ShortUrl');

const router = require('express').Router();
router.get('/all', shortUrl.get_all_URLs)
router.post('/short', shortUrl.create_url)
router.get('/:urlId',shortUrl.redirect_url)




module.exports = router;