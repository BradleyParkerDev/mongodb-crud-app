import express, { Request, Response } from 'express';
const router = express.Router();
import { authController } from '../controllers';


router.post("/login", authController.loginUser)

export default router;