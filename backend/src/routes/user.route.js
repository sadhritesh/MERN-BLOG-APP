import { Router } from "express";
import { updateProfile } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middlware.js";

const router = Router()

router.route("/update-profile").post(verifyJWT, upload.single("profilePicture"), updateProfile)

export default router;