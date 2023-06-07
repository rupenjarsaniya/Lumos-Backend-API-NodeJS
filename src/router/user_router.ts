import { Router } from "express";
import { login, register, userInfo } from "../controller/user_controller";
import { verifyToken } from "../middleware/auth";

const router: Router = Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/user").get(verifyToken, userInfo);

export default router;
