import { Request, Response } from 'express';
import User from '../../database/models/Users';
import mongooseConnect from '../../database/mongoose';

const getUser = async (req: Request, res: Response) => {
    console.log(req.decoded)
    try {
        // Ensure req.decoded is set by the authorizeUser middleware
        const id = req.decoded?.userData?.userId;

        if (!id) {
            return res.status(400).json({ message: "User ID is missing from request" });
        }

        await mongooseConnect();

        const foundUser = await User.findOne({ id: id });

        if (!foundUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const user = {
            id: foundUser.id,
            emailAddress: foundUser.emailAddress,
            userName: foundUser.userName,
            firstName: foundUser.firstName,
            lastName: foundUser.lastName,
            userImage: foundUser.userImage,
            lastUpdated: foundUser.lastUpdated
        };

        res.status(200).json({ message: "Success, user found!", user });
    } catch (error:any) {
        console.error("Error fetching user:", error);
        res.status(500).json({ message: "User not found!", error: error.message });
    }
}

export default getUser;
