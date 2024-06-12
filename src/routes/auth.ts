import express, { Request, Response } from 'express';
const router = express.Router();
import { authController } from '../controllers';


router.post("/login-user", authController.loginUser)

export default router;