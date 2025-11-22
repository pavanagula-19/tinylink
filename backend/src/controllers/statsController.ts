import { Request, Response } from "express";
import { Link } from "../models/Link";
import { AuthRequest } from "../middleware/auth";

export const getStats = async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;

  const totalLinks = await Link.countDocuments({ userId });
  const totalClicksAgg = await Link.aggregate([
    { $match: { userId } },
    { $group: { _id: null, totalClicks: { $sum: "$clicks" } } },
  ]);

  const topLinks = await Link.find({ userId })
    .sort({ clicks: -1 })
    .limit(5)
    .select("code clicks targetUrl");

  res.json({
    totalLinks,
    totalClicks: totalClicksAgg[0]?.totalClicks || 0,
    topLinks,
  });
};
