import { Router } from 'express';

import { ResetPassswordUserController } from '@modules/accounts/useCases/resetPassswordUser/ResetPassswordUserController';
import { SendForgotPasswordMailController } from '@modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController';

const passwordRoutes = Router();

const sendForgotPasswordMailController = new SendForgotPasswordMailController();
const resetPassswordUserController = new ResetPassswordUserController();

passwordRoutes.post('/forgot', sendForgotPasswordMailController.handle);
passwordRoutes.post('/reset', resetPassswordUserController.handle);

export { passwordRoutes };
