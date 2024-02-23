import express from 'express';
import MyUserControllers from '../controllers/MyUserController';
import { jwtCheck, jwtParse } from '../middlewares/auth';
import { validateMyUserRequest } from '../middlewares/validation';

const router = express.Router();

router.get('/', jwtCheck, jwtParse, MyUserControllers.getCurrentUser)
router.post('/', jwtCheck, MyUserControllers.createCurrentUser);
router.put('/', jwtCheck, jwtParse, validateMyUserRequest, MyUserControllers.updateCurrentUser);

export default router;
