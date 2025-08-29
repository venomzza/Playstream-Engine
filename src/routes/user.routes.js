import { Router } from "express";
import { registerUser } from "../controllers/user.controler.js";

const router = Router()

router.route('/register')
    .post(registerUser)

        // Handle user registration
   
// router.route('/login').post(login)

export default router;