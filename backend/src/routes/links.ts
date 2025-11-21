import { Router } from "express";
import {
  createLink,
  getLinks,
  getLinkByCode,
  deleteLink,
} from "../controllers/linkController";
import { auth } from "../middleware/auth";

const router = Router();

router.post("/", auth, createLink);
router.get("/", auth, getLinks);
router.get("/:code", auth, getLinkByCode);
router.delete("/:code", auth, deleteLink);

export default router;
