
const express = require("express");
const { authorization, validateRegister, authorizeRole } = require("../middleware");
const { handleUserLogIn, handleUserSignIn, handleForgotPassword, handleResetPassword, handleNewProperty, handleSavingProperty, handleGetSaveProperty, handleRemoveSaveProperty, handleUserViewAllProperty, handleUserViewByPropertyId } = require("../controllers");

const router = express.Router()




router.post("/login", authorization,  handleUserLogIn);

router.post("/sign-up", validateRegister, handleUserSignIn )

router.post("/forgot-password", handleForgotPassword);   

router.patch("/reset-password",handleResetPassword )

router.post("/new-property", authorizeRole,  handleNewProperty)

router.post("/saved", validateRegister, handleSavingProperty)

router.get("/saved", validateRegister ,handleGetSaveProperty)

router.delete("/saved/:id", validateRegister, handleRemoveSaveProperty)

router.get("/properties",validateRegister,handleUserViewAllProperty )

router.get("/property/:id",validateRegister, handleUserViewByPropertyId)






module.exports = router