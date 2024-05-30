import { Request, Response } from 'express';
import User from '../../database/models/Users';
import mongooseConnect from '../../database/mongoose';

const updateUser = async (req: Request, res: Response) => {
    
    try {

        // connects to database
        await mongooseConnect();


        const userToUpdate = req.body
        const response = await User.updateOne({id:userToUpdate.id},userToUpdate)
          
        if(response.matchedCount === 0){
            return res.json({message: "User not found, could not update user.", response: response})

        }
    
        res.json({message: "Successfully updated user!", response: response})
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating user", error });

    }

}

export default updateUser;

