const { request, response } = require('express')
const Region = require('../models/regiones') // Importa el modelo de región

// Función para obtener todas las comunas
const comunas = async (req, res) => {
  try {
    // Realiza una consulta para obtener todas las regiones
    const regions = await Region.find({}, 'provincias.comunas')

    // Mapea y extrae las comunas de las provincias de las regiones
    const comunas = regions
      .map((region) => region.provincias)
      .flat()
      .map((provincia) => provincia.comunas)
      .flat()

    // Responde con un código de estado 200 y la lista de comunas en formato JSON
    res.status(200).json(comunas)
  } catch (error) {
    // Maneja cualquier error que pueda ocurrir durante la consulta
    res.status(500).json({ error: 'Error en la consulta de comunas' })
  }
}

// Función para seleccionar una comuna específica por su código
const selectComuna = async (req, res) => {
  try {
    // Obtiene el código de comuna desde los parámetros de la URL
    const codComuna = req.params.id

    // Realiza una consulta para encontrar la comuna con el código especificado
    const region = await Region.findOne(
      { 'provincias.comunas.codigo': codComuna },
      'provincias.comunas.$',
    )

    if (!region) {
      return res.status(404).json({ error: 'Comuna no encontrada' })
    }

    // Encuentra la comuna específica por su código
    const comuna = region.provincias
      .flatMap((provincia) => provincia.comunas)
      .find((comuna) => comuna.codigo === codComuna)

    if (!comuna) {
      return res.status(404).json({ error: 'Comuna no encontrada' })
    }

    // Responde con un código de estado 200 y la comuna seleccionada en formato JSON
    res.status(200).json(comuna)
  } catch (error) {
    // Maneja cualquier error que pueda ocurrir durante la consulta
    res.status(500).json({ error: 'Error en la consulta de la comuna' })
  }
}

// Exporta las funciones para su uso en otras partes de la aplicación
module.exports = { comunas, selectComuna }
