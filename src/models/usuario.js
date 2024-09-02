import {Schema, model} from 'mongoose'
import bcrypt from "bcryptjs"

const usuarioSchema = new Schema({
    nombre:{
        type:String,
        require:true,
        maxlength: 20
    },
    apellido:{
        type:String,
        require:true,
        maxlength: 20
    },
    email:{
        type:String,
        require:true,
        maxlength: 50
    },
    password:{
        type:String,
        require:true,
        maxlength: 60
    },
    token:{
        type:String,
        default:null
    }
}, {
    timestamps:true
})

usuarioSchema.methods.encrypPassword = async function(password){
    const salt = await bcrypt.genSalt(10)
    const passwordEncryp = await bcrypt.hash(password,salt)
    return passwordEncryp
}

usuarioSchema.methods.matchPassword = async function(password){
    const response = await bcrypt.compare(password, this.password)
    return response
}
usuarioSchema.methods.crearToken = function(){
    const tokenGenerado = this.token = Math.random().toString(36).slice(2)
    return tokenGenerado
}

export default model('Usuario', usuarioSchema)