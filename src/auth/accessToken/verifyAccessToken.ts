import { jwtVerify } from 'jose';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const verifyAccessToken = async (accessToken:string) => {
    if (!accessToken) {
        console.error('No token provided');
        return null;
    }
    try {
        const secretAccessKey = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET_KEY);
        const { payload } = await jwtVerify(accessToken, secretAccessKey, {
            algorithms: ['HS256']
        });
        // console.log('Token verified with ACCESS_TOKEN_SECRET_KEY:', payload);
        return payload;
    } catch (accessTokenError) {
        // console.error('Token verification failed with ACCESS_TOKEN_SECRET_KEY:', accessTokenError.message);
    }

    return null;

}

export default verifyAccessToken


