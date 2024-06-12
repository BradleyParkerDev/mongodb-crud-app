import { Request, Response } from 'express';
import User from '../../database/models/Users';
import mongooseConnect from '../../database/mongoose';

const deleteUser = async (req: Request, res: Response) => {

    try {

        // Ensure req.decoded is set by the authorizeUser middleware
        const id = req.decoded?.userData?.userId;

        if (!id) {
            return res.status(400).json({ message: "User ID is missing from request" });
        }

        await mongooseConnect();
        const response = await User.deleteOne({ id: id }); // Ensure this is your custom user ID field
        res.json({message:'User successfully deleted!', response: response})        
    } catch (error) {
        res.json({message:'Error deleting user!', error: error})        

    }



}

export default deleteUser;