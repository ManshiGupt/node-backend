const express = require("express");
const app = express();
const connectDB = require("./config/databse");
const User = require("./models/user");
const router = express.Router();
const cookieParser = require("cookie-parser"); 
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

const authRouter= require("./routes/auth");
const profileRouter = require("./routes/profile");
const noteRouter = require("./routes/note");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", noteRouter);

connectDB()
  .then(() => {
    console.log("DataBase connetion enstablished");
    app.listen("3000", () => {
      console.log("app is listening on port 3000");
    });
  })
  .catch((err) => {
    console.log("Error while fetching data from database", err);
  });
