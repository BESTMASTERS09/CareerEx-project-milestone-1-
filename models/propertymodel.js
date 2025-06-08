
const mongoose = require("mongoose")

const propertySchema = new mongoose.Schema({
    title:{type:String, require:true},
    price:{type:String, require:true},
    location:{type:String, require:true},
    agent:{type:mongoose.Schema.Types.ObjectId, ref:"user",require:true}
}, {timestamps: true} )

const pro = new mongoose.model("pro",propertySchema)

module.exports = pro
