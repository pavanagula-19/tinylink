import { Router } from "express";
import { getStats } from "../controllers/statsController";
import { auth } from "../middleware/auth";

const router = Router();

router.get("/stats", auth, getStats);

export default router;
