import express from "express";
import {
  getAllServices,
  getFeaturedServices,
  getCategories,
  getServiceBySlug,
  createService,
  updateService,
  deleteService,
  seedServices,
} from "../controllers/service.controller.js";
import { validateService } from "../middleware/validators.js";

const router = express.Router();

// Public routes
router.get("/", getAllServices);
router.get("/featured", getFeaturedServices);
router.get("/categories", getCategories);
router.get("/:slug", getServiceBySlug);

// Admin routes (add auth middleware in production)
router.post("/", validateService, createService);
router.put("/:id", validateService, updateService);
router.delete("/:id", deleteService);

// Dev seeding route
router.post("/seed/all", seedServices);

export default router;
