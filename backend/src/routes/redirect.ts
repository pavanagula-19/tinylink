import { Router } from "express";
import { Link } from "../models/Link";

const router = Router();

router.get("/:code", async (req, res) => {
  const { code } = req.params;

  const link = await Link.findOneAndUpdate(
    { code },
    { $inc: { clicks: 1 }, $set: { lastClicked: new Date() } },
    { new: true }
  );

  if (!link) return res.status(404).send("Not Found");

  return res.redirect(302, link.targetUrl);
});

export default router;
