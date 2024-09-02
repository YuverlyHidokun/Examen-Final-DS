import {Schema, model} from 'mongoose'

const clienteSchema = new Schema({
    cedula:{
        type: Number,
        require: true,
        maxlenght:10
    },
    nombre:{
        type: String,
        require: true,
        maxlenght:20 
    },
    apellido:{
        type: String,
        require: true,
        maxlenght:20
    },
    ciudad:{
        type: String,
        trim: true,
        default: null
    },
    email:{
        type: String,
        require: true,
        trim: true,
        maxlenght:50
    },
    direccion:{
        type:String,
        trim:true,
        default:null
    },
    telefono:{
        type:Number,
        trim:true,
        maxlenght:10
    },
    fecha_nacimiento: {
        type:Date,
        require:true,
        maxlenght:20
    }, 
    dependencia:{
        type: String,
        trim: true,
        default: null
    }
},{
    timestamps:true
})

export default model('Cliente', clienteSchema)