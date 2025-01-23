"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = require("./controller");
const router = express_1.default.Router();
// Create a new route (POST)
router.post("/savelocations", controller_1.createRoute);
// Get all routes for a specific user (GET)
router.get("/savedlocations/:userId", controller_1.getRoutesByUserId);
// Get all routes (GET)
router.get("/savedlocations", controller_1.getAllRoutes);
// Delete a specific route (DELETE)
router.delete("/savedlocations/:routeId", controller_1.deleteRoute);
exports.default = router;
//# sourceMappingURL=route.js.map