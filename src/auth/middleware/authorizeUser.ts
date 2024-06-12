import { Response, Request, NextFunction } from "express";
import verifyAccessToken from "../accessToken/verifyAccessToken";

const authorizeUser = async (req: Request, res: Response, next: NextFunction) => {
    console.log('Middleware!');
    try {
        const bearerToken = req.headers['authorization'];
        if (bearerToken) {
            const accessToken = bearerToken.split(' ')[1];
            const decoded = await verifyAccessToken(accessToken);
            // console.log(decoded)
            if (!decoded) {
                console.error('Invalid Token');
                return res.status(401).json({ message: 'Invalid Token' });
            }
            
            // // Attach decoded user data to request object
            req.decoded = decoded;

            next(); // Proceed to the next middleware
        } else {
            console.error('Missing Token');
            return res.status(401).json({ message: 'Missing Token' });
        }
    } catch (error: any) {
        console.error('Authorization error:', error.message);
        return res.status(401).json({ message: error.message });
    }
}

export default authorizeUser;
