import { Router } from "express";
import {
    login,
    registro,
	recuperarPassword,
} from "../controller/usuario_controller.js";

const router = Router()

router.post('/usuario/login',login)
router.post('/usuario/registro',registro) //OK
router.post('/usuario/recuperar-password',recuperarPassword)

export default router