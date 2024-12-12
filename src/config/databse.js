const mongoose = require("mongoose");

const connectDB = async()=>{
    await mongoose.connect("mongodb+srv://heymanshigupta:zpfAmLWxFul4CPnH@cluster0.fw0gq.mongodb.net/noteApp");
}

module.exports= connectDB;
