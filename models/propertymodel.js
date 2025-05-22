
const mongoose = require("mongoose")

const propertySchema = new mongoose.Schema({
    title:{type:String, require:true},
    price:{type:String, require:true},
    location:{type:String, require:true},
    agent:{type:Number, default:0}
}, {timestamps: true} )

const pro = new mongoose.model("pro",propertySchema)

module.exports = pro
