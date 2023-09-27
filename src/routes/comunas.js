const Router = require('express').Router
const comunas = require('../controllers/comunas.js').comunas
const selectComuna = require('../controllers/comunas.js').selectComuna

const router = Router()

router.get('/', [], comunas)
router.get('/:id', [], selectComuna)

module.exports = router
