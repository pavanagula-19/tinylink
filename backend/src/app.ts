import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import linkRoutes from "./routes/links";

import { auth } from "./middleware/auth";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/healthz", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/auth", authRoutes);

app.use("/api/links", auth, linkRoutes);

export default app;
