
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const Auth = require("./models/authModel");
const pro = require("./models/propertymodel");
const saveProperty = require("./models/savepropertymodel");
const { sendForgotPasswordEmail, validEmail  } = require("./sendMail");
const { handleGetAllProperty, handleUserSignIn, handleNewProperty, handleUserLogIn, handleResetPassword, handleForgotPassword, handleSavingProperty, handleGetSaveProperty, handleRemoveSaveProperty, handleUserViewAllProperty, handleUserViewByPropertyId } = require("./controllers");
const { validateRegister, authorization, authorizeRole, } = require("./middleware");
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
app.post("/sign-up", validateRegister, handleUserSignIn )


//login
app.post("/login", authorization,  handleUserLogIn)

//forgot password
app.post("/forgot-password", handleForgotPassword);                                                                                                                                                                                                                                                                     

//reset password
app.patch("/reset-password",handleResetPassword ) 

//add new property listing(agent only)
app.post("/new-property", authorizeRole,  handleNewProperty)

//save a property
app.post("/saved", validateRegister, handleSavingProperty)

//get save property
app.get("/saved", validateRegister ,handleGetSaveProperty)

//delete save property
app.delete("/saved/:id", validateRegister, handleRemoveSaveProperty)

//get all property
app.get("/properties",validateRegister,handleUserViewAllProperty )

//get a specfic property by id
app.get("/property/:id",validateRegister, handleUserViewByPropertyId)