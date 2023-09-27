const { Router } = require('express')
const { regiones, region, provinciaRegion, comunasRegion } = require('../controllers/regiones.js')

const router = Router()

router.get('/', [], regiones)
router.get('/:codigoRegion', [], region)
router.get('/:codigoRegion/provincias', [], provinciaRegion)
router.get('/:codigoRegion/comunas', [], comunasRegion)

module.exports = router
