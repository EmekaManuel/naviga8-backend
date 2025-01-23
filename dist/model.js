"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// Mongoose Schema
const RouteSchema = new mongoose_1.default.Schema({
    userId: {
        type: String,
        required: true,
    },
    origin: {
        address: {
            type: String,
            required: true,
        },
        latitude: {
            type: Number,
            required: true,
        },
        longitude: {
            type: Number,
            required: true,
        },
    },
    destination: {
        address: {
            type: String,
            required: true,
        },
        latitude: {
            type: Number,
            required: true,
        },
        longitude: {
            type: Number,
            required: true,
        },
    },
    distance: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
const RouteModel = mongoose_1.default.model("Route", RouteSchema);
exports.default = RouteModel;
//# sourceMappingURL=model.js.map