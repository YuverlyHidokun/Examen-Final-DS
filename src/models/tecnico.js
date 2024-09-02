import {Schema, model} from "mongoose"

const tecnicoSchema = new Schema({
    nombre: {
        type: String,
        require: true,
        maxlength: 20
    },
    apellido: {
        type: String,
        require: true,
        maxlength: 20
    },
    cedula: {
        type: Number,
        require: true,
        maxlength: 20
    },
    fecha_nacimiento: {
        type:Date,
        require:true,
        maxlenght:20
    }, 
    genero:{
        type: String,
        require: true,
        maxlenght:10
    },
    direccion:{
        type: String,
        require: true,
        maxlenght: 20
    },
    telefono:{
        type: Number,
        require: true,
        maxlenght: 10
    },
    email:{
        type:String,
        require:true,
        maxlenght:30
    }
},{
    timestamps: true
})

export default model("Tecnico", tecnicoSchema)