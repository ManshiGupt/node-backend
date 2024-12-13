const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
    title:{
        type:String,
        maxLength: 5
    },
    content :{
        type:String,
        required: true
    },
    updated: {
        type: Date, default: Date.now },

    category :{
        type:String
    },
}, {timestamps: true})

module.exports = mongoose.model("Note",noteSchema);