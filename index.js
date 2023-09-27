// Importa la clase 'Server' desde el archivo 'server.js' en la carpeta 'config'
const Server = require('./src/config/server')

// Importa el módulo 'db' desde el archivo 'database.js' en la carpeta 'config'
const Db = require('./src/config/database.js')

// Importa el módulo 'dotenv' para cargar las variables de entorno desde el archivo '.env'
const dotenv = require('dotenv')

const server = new Server()

dotenv.config()
server.middlewares()
server.routes()
server.listen()

// Inicia la conexión a la base de datos y luego inicia el servidor web
startApp()

async function startApp() {
  try {
    await Db.connectDB()

    // Realiza tus operaciones con MongoDB aquí
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error)
  }
}
