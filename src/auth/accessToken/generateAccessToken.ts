import { SignJWT } from 'jose';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

interface UserData {
    userId: string;
    emailAddress: string;
}

export const generateAccessToken = async (userData: UserData): Promise<string> => {
    // Calculate expiration time: 7 days in seconds
    const accessTokenExp = Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60;

    // Calculate expiration time: 2 minutes in seconds
    // const accessTokenExp = Math.floor(Date.now() / 1000) + 2 * 60;

    // Prepare keys
    const accessTokenSecretKey = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET_KEY!);

    // Prepare payloads and set headers
    const accessTokenPayload = {
        userData,
        type: 'access'
    };

    // Generate Access Token with 7 days expiration
    const accessToken = await new SignJWT(accessTokenPayload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime(accessTokenExp)
        .sign(accessTokenSecretKey);

    return accessToken; // Return the token directly
};

export default generateAccessToken;

