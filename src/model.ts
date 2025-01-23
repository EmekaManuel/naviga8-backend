import mongoose from "mongoose";

// Interface for TypeScript typing
interface IRoute extends mongoose.Document {
  userId: string;
  origin: {
    address: string;
    latitude: number;
    longitude: number;
  };
  destination: {
    address: string;
    latitude: number;
    longitude: number;
  };
  distance: string;
  duration: string;
  createdAt: Date;
}

// Mongoose Schema
const RouteSchema = new mongoose.Schema<IRoute>({
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

const RouteModel = mongoose.model<IRoute>("Route", RouteSchema);

export default RouteModel;
