import { Request, Response } from 'express';
import User from '../../database/models/Users';
import mongooseConnect from '../../database/mongoose';
const getUser = async (req: Request, res: Response) => {

    const userId:string = req.body.id;

    try {

        await mongooseConnect();
        const foundUser = await User.findOne({id: userId})
        const user = {
            id: foundUser.id,
            emailAddress: foundUser.emailAddress,
            userName: foundUser.userName,
            firstName: foundUser.firstName,
            lastName: foundUser.lastName,
            userImage: foundUser.userImage,
            lastUpdated: foundUser.lastUpdated
        }
        res.status(200).json({message: "Success, user found!", user: user})
    } catch (error) {
        res.status(500).json({message: "User not found!", error: error});
    }
    
}

export default getUser;
