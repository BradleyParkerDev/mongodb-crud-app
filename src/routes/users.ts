import express, { Request, Response } from 'express';
const router = express.Router();
import { usersController } from '../controllers';


router.post('/register', usersController.registerUser) 
router.get('/get-user', usersController.getUser) 
router.put('/update-user', usersController.updateUser) 
router.delete('/delete-user', usersController.deleteUser) 



export default router;
