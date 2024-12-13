const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema= new mongoose.Schema({
    firstName :{
        type: String,
        required: true
    },
    lastName:{
        type: String
    },
    emailId:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
})

// userSchema.methods.getJWT = async function () {
//     const user = this;
  
//     const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$790", {
//       expiresIn: "7d",
//     });
  
//     return token;
//   };
  
//   userSchema.methods.validatePassword = async function (passwordInputByUser) {
//     const user = this;
//     const passwordHash = user.password;
  
//     const isPasswordValid = await bcrypt.compare(
//       passwordInputByUser,
//       passwordHash
//     );
  
//     return isPasswordValid;
//   };

module.exports = mongoose.model("User", userSchema);
 