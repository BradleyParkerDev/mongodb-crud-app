import express from 'express';
const router = express.Router();
import { usersController } from '../controllers';
import { authUtil } from '../auth';


router.post('/register-user', usersController.registerUser) 

// routes using middleware
router.get('/get-user', authUtil.verifyUserAccessToken,usersController.getUser) 
router.put('/update-user', authUtil.verifyUserAccessToken,usersController.updateUser) 
router.delete('/delete-user', authUtil.verifyUserAccessToken,usersController.deleteUser) 



export default router;

