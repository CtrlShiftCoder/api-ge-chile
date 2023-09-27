const Router = require('express').Router
const index = require('../controllers/index.js')
const router = Router()

router.get('/index', [], index)

module.exports = router
