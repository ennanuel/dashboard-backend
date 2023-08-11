const router = (require('express')).Router()
const { getSales } = require('../controllers/sales')

router.get('/', getSales);

module.exports = router