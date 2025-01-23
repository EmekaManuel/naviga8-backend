"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRoute = exports.getRoutesByUserId = exports.getAllRoutes = exports.createRoute = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const model_1 = __importDefault(require("./model"));
const createRoute = (0, express_async_handler_1.default)(async (req, res, next) => {
    try {
        const { userId, origin, destination, distance, duration } = req.body;
        if (!userId || !origin || !destination || !distance || !duration) {
            res.status(400).json({ message: "Missing required fields" });
            return;
        }
        const newRoute = new model_1.default({
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
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: "An unknown error occurred" });
        }
    }
});
exports.createRoute = createRoute;
const getAllRoutes = (0, express_async_handler_1.default)(async (req, res, next) => {
    try {
        const routes = await model_1.default.find();
        res.status(200).json(routes);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: "An unknown error occurred" });
        }
    }
});
exports.getAllRoutes = getAllRoutes;
const getRoutesByUserId = (0, express_async_handler_1.default)(async (req, res, next) => {
    try {
        const { userId } = req.params;
        const routes = await model_1.default.find({ userId }).sort({ createdAt: -1 });
        if (!routes) {
            res.status(404).json({ message: "No routes found for this user" });
            return;
        }
        res.json(routes);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: "An unknown error occurred" });
        }
    }
});
exports.getRoutesByUserId = getRoutesByUserId;
const deleteRoute = (0, express_async_handler_1.default)(async (req, res, next) => {
    try {
        const { routeId } = req.params;
        const deletedRoute = await model_1.default.findByIdAndDelete(routeId);
        if (!deletedRoute) {
            res.status(404).json({ message: "Route not found" });
            return;
        }
        res.json({ message: "Route deleted successfully" });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: "An unknown error occurred" });
        }
    }
});
exports.deleteRoute = deleteRoute;
//# sourceMappingURL=controller.js.map