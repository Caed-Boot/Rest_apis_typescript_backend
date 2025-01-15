import express from "express";
import colors from 'colors'
import morgan from 'morgan'
import cors, { CorsOptions } from 'cors'
import router from "./routes";
import db from "./config/db";


const server = express()

// Conectar a base de datos
export const connectDB = async () =>  {
    try {
        await db.authenticate()
        db.sync()
        // console.log(colors.bgGreen.black('Conexion exitosa a la BD'));
        
    } catch (error) {
        console.log(colors.bgMagenta.white('Hubo un error al conectar a la BD'));
    }
}

connectDB()

// Instancia de express


// Permitir conexiones
const corsOptions : CorsOptions = {
    origin: function (origin, callback) {
        if (origin === process.env.FRONTED_URL) {
            callback(null, true)
        } else {
            callback(new Error('Error de CORS'))
        }
        
    }
}
server.use(cors(corsOptions))


// Leer datos de formularios
// .use se usa en todos los request
server.use(express.json())

// Uso de morgan
server.use(morgan('dev'))

server.use('/api/products', router)

server.get('/api', (req, res) => {
    res.json({msg: 'Desde API'})
})

export default server