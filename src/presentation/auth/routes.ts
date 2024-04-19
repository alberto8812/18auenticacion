

import { Router } from 'express';
import { AuthController } from './controller';
import { AuthService } from '../service/auth.service';
import { EmailService } from '../service/email.service';
import { envs } from '../../config';





export class AuthRoutes {


  static get routes(): Router {

    const router = Router();
    const emailService=new EmailService(envs.MAILER_SERVICE,envs.MAILER_EMAIL,envs.MAILER_SECRET_KEY)
    const authService= new AuthService(emailService);
    
    const authController=new AuthController(authService);
   // Definir las rutas
    router.post('/login', authController.loginUser);
    router.post('/register', authController.register);
    router.get('/validate-email/:token', authController.validateEmail );



    return router;
  }


}

