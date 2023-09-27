const mongoose = require('mongoose')

const regionSchema = new mongoose.Schema({
  nombre: String,
  region_iso_3166_2: String,
  capital_regional: String,
  provincias: [
    {
      nombre: String,
      codigo: String,
      capital_provincial: String,
      comunas: [
        {
          nombre: String,
          codigo: String,
        },
      ],
    },
  ],
})

module.exports = mongoose.model('Region', regionSchema)
