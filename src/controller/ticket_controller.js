import mongoose from "mongoose";
import Cliente from '../models/cliente.js';
import Tecnico from '../models/tecnico.js';
import Ticket from "../models/ticket.js";

const esObjectIdValido = (id) => mongoose.Types.ObjectId.isValid(id) && String(new mongoose.Types.ObjectId(id)) === id;

const crearTicket = async (req, res) => {
    const { codigo, descripcion, id_cliente, id_tecnico } = req.body;

    if (Object.values(req.body).includes("")) {
        return res.status(400).json({ msg: "Lo sentimos, debes llenar todos los campos" });
    }

    const verificarCodigoBDD = await Ticket.findOne({ codigo });
    if (verificarCodigoBDD) {
        return res.status(400).json({ msg: "Lo sentimos, ese código ya se encuentra registrado" });
    }

    const permitidoCodigo = /^[A-Z0-9]+$/;
    if (!permitidoCodigo.test(codigo)) {
        return res.status(400).json({ msg: "El código solo puede contener mayúsculas y números" });
    }

    if (!esObjectIdValido(id_cliente[0])) {
        //console.log("ID de cliente no es válido:", id_cliente[0]); // Log de ID inválido
        return res.status(400).json({ msg: "ID de cliente no es válido" });
    }
    
    const verificarCliente = await Cliente.findById(id_cliente[0]);
    if (!verificarCliente) {
        //console.log("Cliente no encontrado:", id_cliente[0]); // Log de cliente no encontrado
        return res.status(400).json({ msg: "No se encontró al cliente" });
    }

    for (let id of id_tecnico) {
        if (!esObjectIdValido(id)) {
            //console.log("ID de técnico no es válido:", id); // Log de ID inválido
            return res.status(400).json({ msg: `ID de técnico no es válido: ${id}` });
        }
        const verificarTecnico = await Tecnico.findById(id);
        if (!verificarTecnico) {
            //console.log("Técnico no encontrado:", id); // Log de técnico no encontrado
            return res.status(400).json({ msg: `No se encontró el técnico con id: ${id}` });
        }
    }

    try {
        const nuevoTicket = new Ticket({ codigo, descripcion, id_cliente, id_tecnico });
        await nuevoTicket.save();
        //console.log("Ticket creado con éxito:", nuevoTicket); // Log de ticket creado
        res.status(201).json({ msg: "El ticket fue creado con éxito" });
    } catch (error) {
        console.error("Error al crear el ticket:", error);
        res.status(500).json({ msg: "Hubo un error al crear el ticket" });
    }
};


const VerTicket = async (req, res) => {
    try {
        const tickets = await Ticket.find().select("-createdAt -updatedAt -__v");
        res.json(tickets);
    } catch (error) {
        console.error("Error al obtener los tickets:", error);
        res.status(500).json({ msg: "Lo sentimos, ocurrió un error", error });
    }
};

const detalleTicket = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ msg: "Lo sentimos, no se encuentra registrado el ticket con ese id" });
    }
    try {
        const ticket = await Ticket.findById(id).select("-createdAt -updatedAt -__v");
        if (!ticket) {
            return res.status(404).json({ msg: "Ticket no encontrado" });
        }
        res.status(200).json(ticket);
    } catch (error) {
        console.error("Error al obtener el ticket:", error);
        res.status(500).json({ msg: "Lo sentimos, ocurrió un error", error });
    }
};

const ActualizarTicket = async (req, res) => {
    const { id } = req.params;

    if (Object.values(req.body).includes("")) {
        return res.status(400).json({ msg: "Lo sentimos, debes llenar todos los campos" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: "Lo sentimos, no se encuentra un ticket registrado con ese id" });
    }

    try {
        const resultado = await Ticket.findByIdAndUpdate(id, req.body, { new: true });
        if (!resultado) {
            return res.status(404).json({ msg: "Ticket no encontrado" });
        }
        res.status(200).json({ msg: "El ticket fue actualizado con éxito", ticket: resultado });
    } catch (error) {
        console.error("Error al actualizar el ticket:", error);
        res.status(500).json({ msg: "Hubo un error al actualizar el ticket" });
    }
};

const EliminarTicket = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: "Lo sentimos, no existe un ticket registrado con ese id" });
    }

    try {
        const resultado = await Ticket.findByIdAndDelete(id);
        if (!resultado) {
            return res.status(404).json({ msg: "Ticket no encontrado" });
        }
        res.status(200).json({ msg: "El ticket fue eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar el ticket:", error);
        res.status(500).json({ msg: "Hubo un error al eliminar el ticket" });
    }
};

export {
    crearTicket,
    VerTicket,
    detalleTicket,
    ActualizarTicket,
    EliminarTicket
};