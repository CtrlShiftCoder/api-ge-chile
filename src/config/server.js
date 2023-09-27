const express = require('express')

// Importa las rutas de diferentes recursos
const indexRoute = require('../routes/index')
const comunasRoute = require('../routes/comunas')
const provinciasRoute = require('../routes/provincias')
const regionesRoute = require('../routes/regiones')

require('dotenv').config()

class Server {
  constructor() {
    // Lee el puerto desde las variables de entorno
    this.port = process.env.PORT
    this.express = express()
    this.middlewares() // Configura los middleware de Express
    this.routes() // Configura las rutas de la aplicación
  }

  middlewares = () => {
    // Configura middleware personalizado: establece una clave en la aplicación Express
    this.express.set('key', process.env.KEY)

    // Configura middleware para manejar JSON en las solicitudes
    this.express.use(express.json())

    // Configura middleware para servir archivos estáticos desde la carpeta 'public'
    this.express.use(express.static('public'))
  }

  routes = () => {
    // Configura las rutas de la aplicación
    this.express.use('/', indexRoute)
    this.express.use('/comunas', comunasRoute)
    this.express.use('/provincias', provinciasRoute)
    this.express.use('/regiones', regionesRoute)
  }

  listen = () => {
    // Inicia el servidor Express y escucha en el puerto especificado
    this.express.listen(this.port, () => {
      console.log('Iniciando aplicación, puerto:', this.port)
    })
  }
}

module.exports = Server
