// Requerir los módulos
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors';
import routerusuario from "./routers/usuario_router.js"

const app = express()
dotenv.config()


app.set('port',process.env.port || 3000)
app.use(cors())

app.use(express.json())

app.get('/',(req,res)=>{
    res.send("Server on")
})

app.use("/caso4", routerusuario)

export default  app