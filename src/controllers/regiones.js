const { request, response } = require('express')
const Region = require('../models/regiones')
const winston = require('winston')

// Configura el sistema de registro (puedes ajustar la configuración según tus necesidades)
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
})

// Función para consultar todas las regiones
const regiones = async (req = request, res = response) => {
  try {
    // Realiza una consulta para obtener todas las regiones
    const regions = await Region.find()

    // Registra un mensaje de información
    logger.info('Consulta exitosa de todas las regiones')

    // Responde con un código de estado 200 y la lista de regiones en formato JSON
    res.status(200).json(regions)
  } catch (error) {
    // Registra un mensaje de error
    logger.error('Error en la consulta de regiones', error)

    // Maneja cualquier error que pueda ocurrir durante la consulta
    res.status(500).json({ error: 'Error en la consulta de regiones' })
  }
}

// Función para consultar una región específica por su identificador
const region = async (req = request, res = response) => {
  try {
    // Obtiene el identificador de la región desde los parámetros de la URL
    const codigoRegion = req.params.codigoRegion

    // Realiza una consulta para encontrar la región con el identificador especificado
    const region = await Region.findOne({ region_iso_3166_2: codigoRegion })

    // Registra un mensaje de información
    logger.info(`Consulta exitosa de la región con código ${codigoRegion}`)

    // Responde con un código de estado 200 y la región seleccionada en formato JSON
    res.status(200).json(region)
  } catch (error) {
    // Registra un mensaje de error
    logger.error('Error en la consulta de la región', error)

    // Maneja cualquier error que pueda ocurrir durante la consulta
    res.status(500).json({ error: 'Error en la consulta de la región' })
  }
}

// Función para consultar las provincias de una región específica
const provinciaRegion = async (req = request, res = response) => {
  try {
    // Obtiene el identificador de la región desde los parámetros de la URL
    const codigoRegion = req.params.codigoRegion

    // Realiza una consulta para encontrar la región con el identificador especificado
    const region = await Region.findOne({ region_iso_3166_2: codigoRegion })

    // Registra un mensaje de información
    logger.info(`Consulta exitosa de provincias de la región con código ${codigoRegion}`)

    // Responde con un código de estado 200 y la lista de provincias de la región en formato JSON
    res.status(200).json(region.provincias)
  } catch (error) {
    // Registra un mensaje de error
    logger.error('Error en la consulta de provincias de la región', error)

    // Maneja cualquier error que pueda ocurrir durante la consulta
    res.status(500).json({ error: 'Error en la consulta de provincias de la región' })
  }
}

// Función para consultar las comunas de una región específica
const comunasRegion = async (req = request, res = response) => {
  try {
    // Obtiene el identificador de la región desde los parámetros de la URL
    const codigoRegion = req.params.codigoRegion

    // Realiza una consulta para encontrar la región con el identificador especificado
    const region = await Region.findOne({ region_iso_3166_2: codigoRegion })

    // Mapea y extrae las comunas de las provincias de la región
    const comunas = region.provincias.reduce((comunas, provincia) => {
      return comunas.concat(provincia.comunas)
    }, [])

    // Registra un mensaje de información
    logger.info(`Consulta exitosa de comunas de la región con código ${codigoRegion}`)

    // Responde con un código de estado 200 y la lista de comunas de la región en formato JSON
    res.status(200).json(comunas)
  } catch (error) {
    // Registra un mensaje de error
    logger.error('Error en la consulta de comunas de la región', error)

    // Maneja cualquier error que pueda ocurrir durante la consulta
    res.status(500).json({ error: 'Error en la consulta de comunas de la región' })
  }
}

// Exporta las funciones para su uso en otras partes de la aplicación
module.exports = { regiones, region, provinciaRegion, comunasRegion }
