const router = (require('express')).Router()
const { getUser, getDashboard } = require('../controllers/general')

router.get('/user/:id', getUser);
router.get('/dashboard', getDashboard);

module.exports = router