import { Request, Response } from 'express';
import User from '../../database/models/Users';
import mongooseConnect from '../../database/mongoose';
import { authUtil } from '../../auth';
const updateUser = async (req: Request, res: Response) => {
    
    try {
        // Ensure req.decoded is set by the authorizeUser middleware
        const id = req.decoded?.userData?.userId;

        if (!id) {
            return res.status(400).json({ message: "User ID is missing from request" });
        }

        // connects to database
        await mongooseConnect();


        const userToUpdate = req.body

        // hash password if in req.body
        if(userToUpdate.password){
            const saltRounds = 5;
            const passwordHash = await authUtil.generatePasswordHash(req.body.password, saltRounds)
            userToUpdate.password = passwordHash;
        }

        const response = await User.updateOne({id: id},userToUpdate)
          
        if(response.matchedCount === 0){
            return res.json({message: "User not found, could not update user.", response: response})

        }
    
        res.json({message: "Successfully updated user!", response: response})
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating user", error });

    }

}

export default updateUser;

