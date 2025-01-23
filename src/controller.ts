import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import RouteModel from "./model";

const createRoute = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { userId, origin, destination, distance, duration } = req.body;

      if (!userId || !origin || !destination || !distance || !duration) {
        res.status(400).json({ message: "Missing required fields" });
        return;
      }

      const newRoute = new RouteModel({
        userId,
        origin: {
          address: origin.address,
          latitude: origin.latitude,
          longitude: origin.longitude,
        },
        destination: {
          address: destination.address,
          latitude: destination.latitude,
          longitude: destination.longitude,
        },
        distance,
        duration,
      });

      const savedRoute = await newRoute.save();
      res.status(201).json(savedRoute);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: "An unknown error occurred" });
      }
    }
  }
);

const getAllRoutes = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const routes = await RouteModel.find();
      res.status(200).json(routes);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: "An unknown error occurred" });
      }
    }
  }
);

const getRoutesByUserId = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { userId } = req.params;

      const routes = await RouteModel.find({ userId }).sort({ createdAt: -1 });

      if (!routes) {
        res.status(404).json({ message: "No routes found for this user" });
        return;
      }

      res.json(routes);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: "An unknown error occurred" });
      }
    }
  }
);

const deleteRoute = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { routeId } = req.params;

      const deletedRoute = await RouteModel.findByIdAndDelete(routeId);

      if (!deletedRoute) {
        res.status(404).json({ message: "Route not found" });
        return;
      }

      res.json({ message: "Route deleted successfully" });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: "An unknown error occurred" });
      }
    }
  }
);

export { createRoute, getAllRoutes, getRoutesByUserId, deleteRoute };
