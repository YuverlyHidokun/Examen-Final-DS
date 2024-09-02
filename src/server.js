// Requerir los módulos
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors';


const app = express()
dotenv.config()


app.set('port',process.env.port || 3000)
app.use(cors())

app.use(express.json())

app.get('/',(req,res)=>{
    res.send("Server on")
})

export default  app