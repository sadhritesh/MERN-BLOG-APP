import { Router } from "express";
import { updateProfile, deleteUser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middlware.js";

const router = Router()

router.route("/update-profile").post(verifyJWT, upload.single("profilePicture"), updateProfile)
router.route("/delete-user").delete(verifyJWT, deleteUser)

export default router;