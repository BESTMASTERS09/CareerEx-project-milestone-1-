
const mongoose = require("mongoose")

const savePropertySchema = new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:`Auth`,index:true, require:true},
    property:{type:mongoose.Schema.Types.ObjectId,ref:`property`,index:true, require:true},
}, {timestamps: true} )

const saveProperty = new mongoose.model("saveProperty",savePropertySchema)

module.exports = saveProperty
