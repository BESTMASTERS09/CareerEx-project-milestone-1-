
const mongoose = require("mongoose")

const authSchem =new mongoose.Schema({
    name:{type:String, require:true},
    email:{type:String, require:true},
    password:{type:String, require:true},
    role:{type:Number, enum:[`agent`,`user`],default:`user`},
    verified:{type:Boolean, default:false}
}, {timestamps: true} )
    
const Auth = new mongoose.model("Auth", authSchem)

module.exports = Auth