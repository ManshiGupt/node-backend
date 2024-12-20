// const mongoose = require("mongoose");

// const noteSchema = mongoose.Schema({
//     title:{
//         type:String,
//         maxLength: 50
//     },
//     content :{
//         type:String,
//         required: true
//     },
//     updated: {
//         type: Date, default: Date.now },

//     category :{
//         type:String
//     },
// }, {timestamps: true})

// module.exports = mongoose.model("Note",noteSchema);



const mongoose = require("mongoose");

const noteSchema = mongoose.Schema(
  {
    title: {
      type: String,
      maxLength: 50,
      required: true,
    },
    content: {
      type: String,
    },
    updated: {
      type: Date,
      default: Date.now,
    },

    category: {
      type: String,
    },
  },
  { timestamps: true }
);

noteSchema.pre("save", function (next) {
  this.updated = new Date();
  next();
});

module.exports = mongoose.model("Note", noteSchema);
