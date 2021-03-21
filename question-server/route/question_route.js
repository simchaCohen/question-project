const router = require('express').Router()
const question_controller = require('../controller/question_controller')

router.get('/getQuestion/:id', question_controller.getQuestion)
router.post('/addQuestion', question_controller.addQuestion)
router.delete('/delQuestion/:id', question_controller.delQuestion)
router.put('/editQuestion/:id', question_controller.editQuestion)


module.exports = router