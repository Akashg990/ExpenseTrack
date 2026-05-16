import express from "express";

import { protect } from "../middleware/authMiddleware.js";

import {
  generateInsights,
} from "../controllers/aiController.js";

const router = express.Router();

router.get(
  "/insights",
  protect,
  generateInsights
);

export default router;