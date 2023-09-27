const { Router } = require('express')
const provincias = require('../controllers/provincias.js')

const router = Router()

router.get('/', [], provincias.provincias)
router.get('/:codigoProvincia', [], provincias.provinciaCodigo)
router.get('/:codigoProvincia/comunas', [], provincias.provinciaComunas)
router.get('/:codigoProvincia/comunas/:codigoComuna', [], provincias.comunaProvincia)

module.exports = router
