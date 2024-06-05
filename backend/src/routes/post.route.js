import { Router } from "express";
import { createPost } from "../controllers/post.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middlware.js";

const router = Router()

router.route("/create-post").post(verifyJWT, upload.single("blogPost"), createPost)

export default router

