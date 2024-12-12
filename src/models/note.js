const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
    Title:{
        type:String
    },
    Content :{
        type:String
    },
    Timestamps :{
        type:String
    },
    Category :{
        type:String
    },
}, {timestamps: true})

module.exports = mongoose.model("Note",noteSchema);