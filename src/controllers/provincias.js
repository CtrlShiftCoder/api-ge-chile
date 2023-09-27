const { request, response } = require('express')
const Region = require('../models/regiones') // Importa el modelo de región

// Función para consultar todas las provincias
const provincias = async (req = request, res = response) => {
  try {
    // Realiza una consulta para obtener todas las provincias
    const provinces = await Region.find({}, 'provincias')

    // Mapea y extrae las provincias de los resultados
    const provinciasList = provinces.map((region) => region.provincias).flat()

    // Responde con un código de estado 200 y la lista de provincias en formato JSON
    res.status(200).json(provinciasList)
  } catch (error) {
    // Maneja cualquier error que pueda ocurrir durante la consulta
    res.status(500).json({ error: 'Error en la consulta de provincias' })
  }
}

// Función para consultar una provincia específica por su código
const provinciaCodigo = async (req = request, res = response) => {
  try {
    // Obtiene el código de provincia desde los parámetros de la URL
    const codProvincia = req.params.codigoProvincia

    // Realiza una consulta para encontrar la provincia con el código especificado
    const province = await Region.findOne({ 'provincias.codigo': codProvincia }, 'provincias.$')

    // Responde con un código de estado 200 y la provincia seleccionada en formato JSON
    res.status(200).json(province.provincias[0])
  } catch (error) {
    // Maneja cualquier error que pueda ocurrir durante la consulta
    res.status(500).json({ error: 'Error en la consulta de la provincia' })
  }
}

// Función para consultar las comunas de una provincia específica
const provinciaComunas = async (req = request, res = response) => {
  try {
    // Obtiene el código de provincia desde los parámetros de la URL
    const codigoProvincia = req.params.codigoProvincia

    // Realiza una consulta para encontrar la provincia con el código especificado
    const province = await Region.findOne(
      { 'provincias.codigo': codigoProvincia },
      'provincias.comunas',
    )

    // Responde con un código de estado 200 y la lista de comunas en formato JSON
    res.status(200).json(province.provincias[0].comunas)
  } catch (error) {
    // Maneja cualquier error que pueda ocurrir durante la consulta
    res.status(500).json({ error: 'Error en la consulta de comunas de la provincia' })
  }
}

// Función para consultar una comuna de una provincia específica por su código
const comunaProvincia = async (req = request, res = response) => {
  try {
    // Obtiene el código de provincia y el código de comuna desde los parámetros de la URL
    const codigoProvincia = req.params.codigoProvincia
    const codigoComuna = req.params.codigoComuna

    // Realiza una consulta para encontrar la provincia con el código especificado
    const province = await Region.findOne(
      { 'provincias.codigo': codigoProvincia, 'provincias.comunas.codigo': codigoComuna },
      'provincias.comunas.$',
    )

    // Responde con un código de estado 200 y la comuna seleccionada en formato JSON
    res.status(200).json(province.provincias[0].comunas[0])
  } catch (error) {
    // Maneja cualquier error que pueda ocurrir durante la consulta
    res.status(500).json({ error: 'Error en la consulta de la comuna de la provincia' })
  }
}

// Exporta las funciones para su uso en otras partes de la aplicación
module.exports = { provincias, provinciaCodigo, provinciaComunas, comunaProvincia }
