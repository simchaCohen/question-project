const router = require('express').Router()
const user_controller = require('../controller/user_controller')

router.post('/addUser', user_controller.addUser)
router.post('/sigIn', user_controller.sigIn)


module.exports = router