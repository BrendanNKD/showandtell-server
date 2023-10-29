import express, { Request, Response } from "express";

export default function HealthRouter() {
  const router = express.Router();

  router.get("/", async (req: Request, res: Response) => {
    try {
      res.status(200).json({ status: "ok" });
    } catch (err) {
      res.status(500).json({ message: "Error checking health" });
    }
  });

  return router;
}
