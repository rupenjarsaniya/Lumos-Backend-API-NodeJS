import { Router } from "express";
import {
  createPost,
  getAllPosts,
  getPost,
} from "../controller/post_controller";
import { verifyToken } from "../middleware/auth";
import upload from "../middleware/upload";

const router: Router = Router();

router.route("/post").post(verifyToken, upload.single("file"), createPost);
router.route("/post").get(verifyToken, getAllPosts);
router.route("/mypost").get(verifyToken, getPost);

export default router;
