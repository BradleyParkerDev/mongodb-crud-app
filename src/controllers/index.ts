// auth controller imports
import loginUser from "./auth/loginUser";
import refreshUserAccessToken from "./auth/refreshUserAccessToken";


// users controller imports 
import registerUser from "./users/registerUser";
import getUser from "./users/getUser";
import updateUser from "./users/updateUser";
import deleteUser from "./users/deleteUser";



// export authController
export const authController = {
    loginUser,
    refreshUserAccessToken
}

// export usersController
export const usersController =  {
    registerUser,
    getUser,
    updateUser,
    deleteUser
}

