import express, { Request, Response } from 'express';
const router = express.Router();
import { authController } from '../controllers';


router.post("/login", authController.loginUser)
router.post("/refresh-access-token", authController.refreshUserAccessToken)

export default router;