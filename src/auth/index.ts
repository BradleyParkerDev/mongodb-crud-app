// accessToken
import generateAccessToken from "./accessToken/generateAccessToken";

// hashing
import generatePasswordHash from "./hashing/generatePasswordHash";

//  middleware
import authorizeUser from "./middleware/authorizeUser";


// validation
import validatePassword from "./validation/validatePassword";



export const authUtil =  {

    // accessToken
    generateAccessToken,

    // hashing
    generatePasswordHash,

    // middleware
    authorizeUser,

    // validation
    validatePassword

}