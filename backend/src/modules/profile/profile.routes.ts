import express from "express";

// controlllers
import {
  GetProfile,
  UpdateName,
  ChangeEmailRequest,
  ChangeEmail,
  ChangePassword,
} from "./profile.controller.js";
import { validateSchema } from "../../middlewares/validate-schema.js";
import { changePasswordSchema } from "./schema/changePassword.schema.js";

const router = express.Router();

router.get("/", GetProfile);
router.put("/update-name", UpdateName);
router.get("/email-request", ChangeEmailRequest);
router.put("/email", ChangeEmail);
router.put("/password",validateSchema({ body: changePasswordSchema }), ChangePassword);

export default router;
