const Auth = require("../models/authModel")
const saveProperty = require("../models/savepropertymodel")
const { validEmail } = require("../sendMail")
const { findUserService } = require("../service")




const handleUserSignIn = async(req,res)=>{

    try {
        
        const { fullName, email, password, role } = req.body;

        if(!email) {
            return res.status(400).json({message: "please add your email"});
        }

        if (!validEmail(email)) {
            return res.status(400).json({message:"incorrect email format"})
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
            fullName,
            email,
            password: hashedPassword,
            role

        })

        await newUser.save()

        res.status(201).json({
            message: "User account created successfully",
            newUser:{ fullName, email,role}
        })


    } catch (error) {
        res.status(500).json({message:"error message"})
        
    }
}

const handleUserLogIn = async (req, res)=>{
    
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
           fullName: user?.fullName
        },
        refreshToken
    })
 
    } catch (error) {

        res.status(500).json({message:"error message"})   
    }

}

const handleForgotPassword =  async (req ,res)=> {

    const { email,userName } = req.body;


    const user = await Auth.findOne({email});
    


    if(!user) {
        return res.status(404).json({message: "user not found."});
    }

    const accessToken = await jwt.sign(
        {user},
        `${process.env.ACCESS_TOKEN}`,
        {expiresIn: "5m"}
    )

    await sendForgotPasswordEmail(email, accessToken)

    res.status(200).json({message:"Please check your email"});
}

const handleResetPassword = async (req, res)=> {

    const { password } = req.body

    const user = await Auth.fineOne({ email: req.user.email })

    if(!User){
        return res.status(400).json({message:"user account not found!"})
    }

    const hashedPassword = await bcrypt.hash(password, 13)

    user.password = hashedPassword

    await user.saver()

    res.status(200).json({message:"password reset6 successful."})
}

const  handleNewProperty =  async (req, res) => {

    try {
        const {title,price, location, agent} = req.body

        if(!title || !price ||!location || !agent){
            return res.status(400).json({message:"please enter all required field"})
        }

        const newProperty = new property({title,price, location, agent });

        await property.save();
        res.send(property);

        
    } catch (error) {
        res.status(400).send(error)
        
    }
    
}

const handleSavingProperty = async (req, res) => {
    try {
        const savedProperty = new SaveProperty({
            user:req.user.userId, 
            property:req.body.propertyId
        });
        await saveProperty.save();
        res.status(200).json({message:"property save successful"})
        
    } catch (error) {
        res.status(400).json({message:"error message"})
        
    }
    
}

const handleGetSaveProperty = async (req, res) => {

    try {
        const savedProperties = await SaveProperty.find({user:req.user.userId}).populate("propert");

        res.status(200).json({message:"search successful"})

    } catch (error) {
        res.status(400).json({massage:"error message"})
        
    }
    
}

const handleGetAllProperty = async (req,res) => {

    try {

        const allProperty = await findPropertyService()

        res.status(200).json({
            message:"successful",
            allProperty
        })
        
    } catch (error) {
        res.status(500).json({message:"error message"})
        
    }
    
}

const handleRemoveSaveProperty = async (req, res) => {

    try {
        await SavedProperty.findOneAndDelete({
            user: req.user.userId,
            property: req.params.id
        });

        res.status(200).json({message:"property unsaved"})
        
    } catch (error) {
        res.status(400).json({message:"error message"})
        
    }
    
}

const handleUserViewAllProperty =  async (req, res) => {
    try {
        const properties = await property.find();
        res.status(200).json({message:"search successful"})

    } catch (error) {
        res.status(400).json({message:"error message"})
        
    }
    
}

const handleUserViewByPropertyId = async (req, res) => {

    try {
         const property = await Property.findById(req.params.id);
         res.status(200).json({message: "search successful"})
    } catch (error) {
        res.status(400).json({message:"error message."})
        
    }
    
}






module.exports = {
   handleGetAllProperty,
   handleUserSignIn,
   handleNewProperty,
   handleUserLogIn,
   handleResetPassword,
   handleForgotPassword,
   handleSavingProperty,
   handleGetSaveProperty,
   handleRemoveSaveProperty,
   handleUserViewAllProperty,
   handleUserViewByPropertyId
}