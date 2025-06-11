
const express = require("express");
const { authorization, validateRegister, authorizeRole } = require("../middleware");
const { handleUserLogIn, handleUserSignIn, handleForgotPassword, handleResetPassword, handleNewProperty, handleSavingProperty, handleGetSaveProperty, handleRemoveSaveProperty, handleUserViewAllProperty, handleUserViewByPropertyId, handleGetAllProperty, handlePostSavedProperty, handleGetSavedProperty } = require("../controllers");

const router = express.Router()




router.post("/login", validateRegister,  handleUserLogIn);

router.post("/sign-up", handleUserSignIn )

router.post("/forgot-password", handleForgotPassword);   

router.patch("/reset-password",handleResetPassword )

router.post("/new-property",authorization, handleNewProperty)

router.post("/saved",authorization,handlePostSavedProperty)

router.get("/saved",authorization,handleGetSavedProperty)

router.delete("/saved/:id",authorization, handleRemoveSaveProperty)

router.get("/properties",authorization,handleGetAllProperty )

router.get("/property/:id",authorization, handleUserViewByPropertyId)






module.exports = router