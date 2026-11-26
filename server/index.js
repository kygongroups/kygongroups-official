import path from "node:path";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { processContactRequest } from "./contactHandler.js";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT || 3001);

app.use(cors());
app.use(express.json({ limit: "64kb" }));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "kygon-groups-api" });
});

app.post("/api/contact", async (req, res) => {
  try {
    const result = await processContactRequest(req.body);
    res.status(result.status).json(result.body);
  } catch (error) {
    console.error("Contact submission error:", error);
    res.status(500).json({
      ok: false,
      error: "Unable to process your request right now. Please email contact@kygongroups.com directly.",
    });
  }
});

const distDir = path.resolve(process.cwd(), "dist");
app.use(express.static(distDir));
app.get("*", (_req, res, next) => {
  const indexFile = path.join(distDir, "index.html");
  res.sendFile(indexFile, (err) => {
    if (err) next();
  });
});

app.listen(PORT, () => {
  console.log(`Kygon Groups server listening on http://localhost:${PORT}`);
});

