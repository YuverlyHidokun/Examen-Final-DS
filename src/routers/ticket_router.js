import{
    crearTicket,
    VerTicket,
    detalleTicket,
    ActualizarTicket,
    EliminarTicket
} from '../controller/ticket_controller.js'
import verificarJWT from "../middlewares/verificarJWT.js";

import {Router} from "express"

const route = Router()


route.post("/ticket/crear", verificarJWT, crearTicket);//OK
route.get("/ticket/ver", verificarJWT,VerTicket);//OK
route.get("/ticket/ver/:id", verificarJWT, detalleTicket);//OK
route.put("/ticket/actualizar/:id", verificarJWT, ActualizarTicket);//OK
route.delete("/ticket/eliminar/:id", verificarJWT, EliminarTicket);//OK

export default route