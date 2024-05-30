import { Request, Response } from 'express';
import User from '../../database/models/Users';
import mongooseConnect from '../../database/mongoose';

const deleteUser = async (req: Request, res: Response) => {

    const userId:string = req.body.id;

    try {
        await mongooseConnect();
        const response = await User.deleteOne({ id: userId }); // Ensure this is your custom user ID field
        res.json({message:'User successfully deleted!', response: response})        
    } catch (error) {
        res.json({message:'Error deleting user!', error: error})        

    }



}

export default deleteUser;