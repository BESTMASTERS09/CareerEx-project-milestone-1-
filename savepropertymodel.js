
const mongoose = require("mongoose")

const savePropertySchema = new mongoose.Schema({
    user:{type:String, require:true},
    property:{type:String, require:true},
}, {timestamps: true} )

const saveProperty = new mongoose.model("saveProperty",savePropertySchema)

module.exports = saveProperty
