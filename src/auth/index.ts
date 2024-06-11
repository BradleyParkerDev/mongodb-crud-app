// hashing
import generatePasswordHash from "./hashing/generatePasswordHash";

//  middleware
import verifyUserAccessToken from "./middleware/verifyUserAccessToken";

// token
import generateAccessToken from "./token/generateAccessTokens";

// validation
import validatePassword from "./validation/validatePassword";



export const authUtil =  {
    // hashing
    generatePasswordHash,

    // middleware
    verifyUserAccessToken,
    
    // token
    generateAccessToken,

    // validation
    validatePassword

}