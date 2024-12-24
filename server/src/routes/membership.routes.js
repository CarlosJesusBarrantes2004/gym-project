import { Router } from "express";
import {
  createMembership,
  getMemberships,
  updateMembership,
  getMembership,
} from "../controllers/membership.controllers.js";
import validatorMiddleware from "../middlewares/validator.middleware.js";
import membershipSchema from "../schemas/membership.schema.js";

const router = Router();

router.get("/", getMemberships);
router.get("/:dni", getMembership);
router.post("/", validatorMiddleware(membershipSchema), createMembership);
router.put("/:id", validatorMiddleware(membershipSchema), updateMembership);

export default router;
