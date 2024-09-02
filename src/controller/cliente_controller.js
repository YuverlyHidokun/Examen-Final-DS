import mongoose from "mongoose";
import Cliente from "../models/cliente.js";
import Usuario from "../models/usuario.js";

const CrearCliente = async (req, res) =>{

    const {cedula, nombre, apellido, ciudad, email, direccion, telefono, fecha_nacimiento, dependencia} = req.body
    
    if(Object.values(req.body).includes("")){
        return res.status(400).json({msg:"Lo sentimos, debe llenar todos los datos"})
    }

    const EmailUsuario = await Usuario.findOne({email})
    if (EmailUsuario){
        return res.status(400).json({msg:"Lo sentimos el email, parece que ha sido registrado en una cuenta de usuario"})
    }

    const VerificarEmail = await Cliente.findOne({email})
    if(VerificarEmail){
        return res.status(400).json({msg:"Lo sentimos, el email ya se encuentra registrado"})
    } 

    const Verificacion_numeros = /^[0-9]+$/;
    if(!Verificacion_numeros.test(cedula)){
        return res.status(400).json({msg:"Asegurese de ingresar solo numeros en la cedula"})
    } 

    if(!Verificacion_numeros.test(telefono)){
        return res.status(400).json({msg:"Asegurese de ingresar solo numeros en el telefono"})
    }

    const VerificarCedula = await Cliente.findOne({cedula})
    if(VerificarCedula) return res.status(400).json({msg:"Lo sentimos, la cedula ya se encuentra registrada"})

    const Verificartelefono = await Cliente.findOne({telefono})
    if(Verificartelefono) return res.status(400).json({msg:"Lo sentimos, el telefono ya se encuentra registrado"})

    const nuevoCliente= new Cliente(req.body)
    await nuevoCliente.save()

    res.status(200).json({msg:"El cliente fue registrado exitosamente"})
}

const VerCliente = async (req,res) => {
    try{
        const clientes = await Cliente.find().select("-createdAt -updatedAt -__v");
        res.json(clientes)
    } catch (error) {
        res.status(500).json({msg:"Hubo un error al mostrar los clientes", error})
    }
}

const detalleCliente = async(req,res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({msg:`Lo sentimos, no se encuentra registrado el cliente`});
    const cliente = await Cliente.findById(id).select("-createdAt -updatedAt -__v")
    res.status(200).json(cliente)
}

const ActualizarCliente= async (req, res) => {
    const { id } = req.params;

    if (Object.values(req.body).includes("")) {
        return res.status(400).json({ msg: "Lo sentimos, debe llenar todos los datos" });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: "No se ha encontrado a un cliente con ese ID" });
    }

    try {

        const clienteActualizado = await Cliente.findByIdAndUpdate(id, req.body, { new: true });

        if (!clienteActualizado) {
            return res.status(404).json({ msg: "Técnico no encontrado" });
        }

        res.status(200).json(clienteActualizado);
    } catch (error) {
        console.error("Error al actualizar el cliente:", error);
        res.status(500).json({ msg: "Error en el servidor" });
    }
};


const EliminarCliente = async (req,res) => {

    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({msg:"Lo sentimos, no se ha encontrado al cliente"})

    await Cliente.findByIdAndDelete(id)

    res.status(200).json({msg:"El registro del cliente ha sido eliminado exitosamente"})
}

export{
    CrearCliente,
    VerCliente,
    detalleCliente,
    ActualizarCliente,
    EliminarCliente
}