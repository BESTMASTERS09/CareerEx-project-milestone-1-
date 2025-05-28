
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const Auth = require("./models/authModel");
const pro = require("./models/propertymodel");
const saveProperty = require("./models/savepropertymodel");
const cors = require("cors")


dotenv.config();


const app = express();

app.use(express.json());
app.use(cors())

const PORT = process.env.PORT || 6487;
 


mongoose.connect(process.env.MONGODB_URL)
.then(()=>{
    console.log("MongoDb connected...")

    app.listen(PORT, ()=>{
        console.log(`server is running on Port ${PORT}`)
    })
})


//register
app


app

//forgot password
app                                                                                                                                                                                                                                                                  

//reset password
app

//add new property listing(agent only)
app

//save a property
app

//get save property
app

//delete save property
app

//get all property
app

//get a specfic property by id
app