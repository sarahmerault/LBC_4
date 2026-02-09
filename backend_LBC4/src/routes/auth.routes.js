import express from 'express';
import { register_controller, verifyEmail_controller,login_controller, resetPasswordRequest_controller, resetPassword_controller } from '../controllers/auth.controller.js';

import { validateRegister_middleware,validateLogin_middleware } from '../middlewares/validation.middleware.js';

const router = express.Router();


//S'ENREGISTRER 
router.post('/register', validateRegister_middleware, register_controller);

//SE CONNECTER
router.post('/login',validateLogin_middleware,login_controller)

//RECUPRER LE MAIL DE VERIFICATION
router.get('/verify', verifyEmail_controller)

//ENVOYER UN MAIL DE REINITIALISATION
router.post('/reset-password-request', resetPasswordRequest_controller)

//CHANGER SONT PASSWORD
router.post('/reset-password',resetPassword_controller)


export default router;
