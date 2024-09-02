import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors';
import routerusuario from "./routers/usuario_router.js"
import routertecnico from './routers/tecnico_router.js'
import routercliente from './routers/cliente_router.js'
import routerticket from './routers/ticket_router.js'


const app = express()
dotenv.config()


app.set('port',process.env.port || 3000)
app.use(cors())

app.use(express.json())

app.get('/',(req,res)=>{
    res.send("Server on")
})

app.use("/caso4", routerusuario)
app.use("/caso4", routertecnico)
app.use("/caso4", routercliente)
app.use("/caso4", routerticket)

export default  app