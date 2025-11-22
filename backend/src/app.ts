import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import linkRoutes from "./routes/links";
import redirectRoutes from "./routes/redirect";
import { auth } from "./middleware/auth";
import statsRoutes from "./routes/stats";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/healthz", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/", redirectRoutes);
app.use("/api/links", auth, linkRoutes);
app.use("/api/links", statsRoutes);

export default app;
