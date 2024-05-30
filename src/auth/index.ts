// hashing
import generatePasswordHash from "./hashing/generatePasswordHash";

// tokens
import compareUserRefreshToken from "./tokens/compareUserRefreshToken";
import generateUserTokens from "./tokens/generateUserTokens";
import getTokenExpiration from "./tokens/getTokenExpiration";
import verifyToken from "./tokens/verifyToken";

// validation
import validatePassword from "./validation/validatePassword";




export const authUtil =  {
    // hashing
    generatePasswordHash,

    // middleware

    // tokens
    compareUserRefreshToken,
    generateUserTokens,
    getTokenExpiration,
    verifyToken,


    // validation
    validatePassword

}