import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: { id: string; email: string; fullName: string };
}

const JWT_SECRET = process.env.JWT_SECRET!;

export const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer "))
    return res.status(401).json({ error: "Unauthorized" });

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;

    req.user = {
      id: decoded.id,
      email: decoded.email,
      fullName: decoded.fullName,
    };

    next();
  } catch (e: any) {
    if (e.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Session expired, login again" });
    }
    return res.status(401).json({ error: "Invalid token" });
  }
};
