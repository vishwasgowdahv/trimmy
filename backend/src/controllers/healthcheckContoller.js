import { ApiResponse } from "../utils/api-response.js";
import { checkDbConnection } from "../models/healthCheckModel.js";

const healthCheck = async (req, res) => {
  try {
    const isConnected = await checkDbConnection();
    if (!isConnected) {
      res
        .status(503)
        .json(new ApiResponse(503, null, "Database connection failed"));
      return;
    }
    res
      .status(200)
      .json(new ApiResponse(200, { message: "Server is Running" }));
  } catch (error) {
    console.log("Failed to check database connection", error);
    res.status(500).json(new ApiResponse(500, null, "Server error"));
  }
};

export { healthCheck };
