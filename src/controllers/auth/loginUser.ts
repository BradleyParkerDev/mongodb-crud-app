import { Request, Response } from "express";
import User from "../../database/models/Users";
import mongooseConnect from "../../database/mongoose";
import { authUtil } from "../../auth";

const loginUser = async (req:Request , res:Response) => {


    const userLoginData = {
        emailAddress: req.body.emailAddress,
        password: req.body.password
    }


    // Connecting to MongoDB
    await mongooseConnect();

    // Finding user in database
    const foundUser = await User.findOne({emailAddress: userLoginData.emailAddress});

    // If user not found
    if (!foundUser) {
        return res.status(404).json({ success: false, message: 'Could not find user.' });
    }

    // Validate password
    const passwordValid = await authUtil.validatePassword(userLoginData.password, foundUser.password);
    
    // If password not valid
    if (!passwordValid) {
        return res.status(401).json({ success: false, message: 'Password was incorrect.' });
    }
    
    if(passwordValid){
        res.status(200).json({message: "User has successfully logged in!", foundUser: foundUser});
    }
    

}

export default loginUser;