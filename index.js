
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const Auth = require("./authModel");
const pro = require("./propertymodel");
const saveProperty = require("./savepropertymodel");
dotenv.config();


const app = express();

app.use(express.json())

const PORT = process.env.PORT || 6487;
 


mongoose.connect(process.env.MONGODB_URL)
.then(()=>{
    console.log("MongoDb connected...")

    app.listen(PORT, ()=>{
        console.log(`server is running on Port ${PORT}`)
    })
})


//register
app.post("/sign-up", async(req,res)=>{

    try {
        
        const { name, email, password, role } = req.body
        if(!email){
            return res.status(400).json({message: "please add your email"})
        }

        if(!password){
            return res.status(400).json({message:" Please enter Password"})    
        }

        const existingUser = await Auth.findOne({ email })
        
        if(existingUser){
            return res.status(400).json({message: "User account already exist"})
        }

        if(password.lenth < 7){
            return res.status(400).json({message:"Password should be min of 7"})
        }

        const hashedPassword = await bcrypt.hash(password, 13)

        const newUser = new Auth({
            name,
            email,
            password: hashedPassword,
            role

        })

        await newUser.save()

        res.status(201).json({
            message: "User account created successfully",
            newUser:{ name, email,role}
        })


    } catch (error) {
        res.status(500).json({message:"error message"})
        
    }
})


//login
app.post("/login", async (req, res)=>{
    
    try {

     const {   email, password } = req.body

     const user = await Auth.findOne({ email })

    if(!user){
        return res.status(404).json({message: "User account does not exist."})
    }

    const isMatch = await bcrypt.compare(password, user?.password)

    if (!isMatch){
        return res.status(400).json({message: "incorrect email or password."})
    }


    const  accessToken = jwt.sign(
        {id: user?._id},
        process.env.ACCESS_TOKEN,
        {expiresIn: "5m"}
    )

    const refreshToken = jwt.sign(
        {id: user?._id},
        process.env.REFRESH_TOKEN,
        {expiresIn:"30d"}
    ) 

  

    res.status(200).json({
        message:"login successful",
        accessToken,
        user:{
           email: user?.email,
           role: user?.role,
           name: user?.name
        },
        refreshToken
    })
 
    } catch (error) {

        res.status(500).json({message:"error message"})   
    }

})




//add new property listing(agent only)