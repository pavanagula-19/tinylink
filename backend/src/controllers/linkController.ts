import { Request, Response } from "express";
import { Link } from "../models/Link";
import { AuthRequest } from "../middleware/auth";

const CODE_REGEX = /^[A-Za-z0-9]{6,8}$/;

function isValidUrl(url: string) {
  try {
    const u = new URL(url);
    return ["http:", "https:"].includes(u.protocol);
  } catch {
    return false;
  }
}

function generateRandomCode(length = 6) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let code = "";
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export const createLink = async (req: AuthRequest, res: Response) => {
  const { targetUrl, code } = req.body;

  if (!targetUrl || !isValidUrl(targetUrl)) {
    return res.status(400).json({ error: "Invalid URL" });
  }

  const finalCode = code || generateRandomCode();

  if (!CODE_REGEX.test(finalCode)) {
    return res.status(400).json({ error: "Code must match [A-Za-z0-9]{6,8}" });
  }

  const exists = await Link.findOne({ code: finalCode });
  if (exists) return res.status(409).json({ error: "Code already exists" });

  const link = await Link.create({
    code: finalCode,
    targetUrl,
    userId: req.user!.id,
  });

  return res.status(201).json({
    code: link.code,
    shortUrl: `${process.env.BASE_URL}/${link.code}`,
    targetUrl: link.targetUrl,
  });
};

export const getLinks = async (req: AuthRequest, res: Response) => {
  const links = await Link.find({ userId: req.user!.id }).sort({
    createdAt: -1,
  });
  return res.json(links);
};

export const getLinkByCode = async (req: AuthRequest, res: Response) => {
  const { code } = req.params;

  const link = await Link.findOne({
    code,
    userId: req.user!.id,
  });

  if (!link) return res.status(404).json({ error: "Not found" });

  return res.json(link);
};

export const deleteLink = async (req: AuthRequest, res: Response) => {
  const { code } = req.params;

  const deleted = await Link.findOneAndDelete({
    code,
    userId: req.user!.id,
  });

  if (!deleted) return res.status(404).json({ error: "Not found" });

  return res.status(204).send();
};
