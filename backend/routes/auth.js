import { Router } from 'express';
import{signup,login,logout} from '../controllers/authController.js'
import { verifyJWT } from '../middlewares/authMiddleware.js';
const router = Router()

router.route('/signup').post(signup); // POST /api/auth/signup
router.route('/login').post(login); // POST /api/auth/logi
router.route('/logout').post(verifyJWT, logout);

export default router;
