const mongoose = require('mongoose')
require('dotenv').config()

class Db {
  constructor() {
    this.isConnected = false
  }

  async connectDB() {
    try {
      if (!this.isConnected) {
        await mongoose.connect(process.env.MONGODB_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        })
        this.isConnected = true
        console.log('Conexión a MongoDB exitosa')
      }
    } catch (error) {
      console.error('Error al conectar a MongoDB:', error)
    }
  }
}
const dbInstance = new Db()

module.exports = dbInstance
