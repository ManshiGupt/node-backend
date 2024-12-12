const express= require("express");
const authRouter = express.Router();

authRouter.post(("/signin"), async(req,res)=>{
    const user = new User(req.body);
    try {
      await user.save();
      res.send("hi manshi");
    } catch (error) {
      console.log(error);
    }
})
authRouter.post(("/login"), async(req,res)=>{
        
})
authRouter.post(("/logout"), async(req,res)=>{
        
})

module.exports = authRouter;