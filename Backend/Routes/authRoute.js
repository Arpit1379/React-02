import { Router } from 'express';
import { authLogin, authRegister,authForgetPassword,resetPassword } from '../Controllers/auth.js';

const router=Router();

router.post("/register",authRegister);
router.post('/login',authLogin);
router.post("/forget-password",authForgetPassword);
router.post('/reset-password',resetPassword);

export default router;