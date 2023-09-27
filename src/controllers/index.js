// Importa las dependencias 'request' y 'response' de Express
const Router = require('express').Router

const router = Router()

router.get('/', (req, res) => {
  res.status(200).json('Bienvenido a mi API')
})

module.exports = router
