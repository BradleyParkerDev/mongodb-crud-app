import { Request, Response } from 'express';
import mongooseConnect from '../../database/mongoose';
import User from '../../database/models/Users';
import { uuid } from 'uuidv4';
const registerUser = async (req: Request, res: Response) => {


    try {

        // Creating new user data
        const newUserData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName,
            emailAddress: req.body.emailAddress,
            password: req.body.password
        }; 

        await mongooseConnect();

        // Inserting new user into database
        const newUser = new User(newUserData);
        const insertedUser = await newUser.save();

        res.status(200).json({message:'User successfully registered!', insertedUser: insertedUser})        


    } catch (error) {

        res.status(500).send({ message: "Error registering new user", error });
    }


}

export default registerUser;
