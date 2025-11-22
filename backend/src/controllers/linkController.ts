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
  const userId = req.user!.id;

  const {
    code,
    minClicks,
    maxClicks,
    from,
    to,
    page = "1",
    limit = "10",
  } = req.query;

  const filter: any = { userId };

  if (code) {
    filter.code = { $regex: String(code), $options: "i" };
  }

  if (minClicks || maxClicks) {
    filter.clicks = {};
    if (minClicks) filter.clicks.$gte = Number(minClicks);
    if (maxClicks) filter.clicks.$lte = Number(maxClicks);
  }

  if (from || to) {
    filter.createdAt = {};
    if (from) filter.createdAt.$gte = new Date(String(from));
    if (to) filter.createdAt.$lte = new Date(String(to));
  }

  const pageNum = Number(page);
  const limitNum = Number(limit);
  const skip = (pageNum - 1) * limitNum;

  const [links, total] = await Promise.all([
    Link.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limitNum),

    Link.countDocuments(filter),
  ]);

  res.json({
    page: pageNum,
    limit: limitNum,
    total,
    pages: Math.ceil(total / limitNum),
    links,
  });
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
export const updateLink = async (req: AuthRequest, res: Response) => {
  const { code } = req.params;
  const { targetUrl, newCode } = req.body;

  if (targetUrl && !isValidUrl(targetUrl)) {
    return res.status(400).json({ error: "Invalid URL" });
  }

  if (newCode && !CODE_REGEX.test(newCode)) {
    return res
      .status(400)
      .json({ error: "Code must be 6–8 alphanumeric chars" });
  }

  if (newCode && newCode !== code) {
    const exists = await Link.findOne({ code: newCode });
    if (exists) {
      return res.status(409).json({ error: "New code already exists" });
    }
  }

  const updated = await Link.findOneAndUpdate(
    { code, userId: req.user!.id },
    {
      ...(targetUrl ? { targetUrl } : {}),
      ...(newCode ? { code: newCode } : {}),
    },
    { new: true }
  );

  if (!updated) return res.status(404).json({ error: "Not found" });

  return res.json({
    message: "Link updated successfully",
    link: updated,
  });
};
