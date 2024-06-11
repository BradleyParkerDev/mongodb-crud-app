// auth controller imports
import loginUser from "./auth/loginUser";


// users controller imports 
import registerUser from "./users/registerUser";
import getUser from "./users/getUser";
import updateUser from "./users/updateUser";
import deleteUser from "./users/deleteUser";



// export authController
export const authController = {
    loginUser
}

// export usersController
export const usersController =  {
    registerUser,
    getUser,
    updateUser,
    deleteUser
}

