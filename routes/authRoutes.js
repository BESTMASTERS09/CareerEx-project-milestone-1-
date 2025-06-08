
const express = require("express");
const { authorization, validateRegister, authorizeRole } = require("../middleware");
const { handleUserLogIn, handleUserSignIn, handleForgotPassword, handleResetPassword, handleNewProperty, handleSavingProperty, handleGetSaveProperty, handleRemoveSaveProperty, handleUserViewAllProperty, handleUserViewByPropertyId, handleGetAllProperty } = require("../controllers");

const router = express.Router()




router.post("/login", validateRegister,  handleUserLogIn);

router.post("/sign-up", handleUserSignIn )

router.post("/forgot-password", handleForgotPassword);   

router.patch("/reset-password",handleResetPassword )

router.post("/new-property",authorization, handleNewProperty)

router.post("/saved", validateRegister, handleSavingProperty)

router.get("/saved", validateRegister ,handleGetSaveProperty)

router.delete("/saved/:id", validateRegister, handleRemoveSaveProperty)

router.get("/properties",validateRegister,handleGetAllProperty )

router.get("/property/:id",validateRegister, handleUserViewByPropertyId)






module.exports = router