import express from "express";
import {
  createRoute,
  deleteRoute,
  getAllRoutes,
  getRoutesByUserId,
} from "./controller";

const router = express.Router();

// Create a new route (POST)
router.post("/savelocations", createRoute);

// Get all routes for a specific user (GET)
router.get("/savedlocations/:userId", getRoutesByUserId);

// Get all routes (GET)
router.get("/savedlocations", getAllRoutes);

// Delete a specific route (DELETE)
router.delete("/savedlocations/:routeId", deleteRoute);

export default router;
