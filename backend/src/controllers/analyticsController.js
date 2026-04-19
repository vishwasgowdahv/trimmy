import { getUrlStats } from "../models/statsModel.js";
import { getClicksByUrl } from "../models/clickModel.js";
import { ApiResponse } from "../utils/api-response.js";

async function getUrlAnalytics(req, res) {
  try {
    const { urlId } = req.params;

    const stats = await getUrlStats(urlId);
    const clicks = await getClicksByUrl(urlId);

    res.status(200).json(
      new ApiResponse(
        200,
        {
          stats,
          clicks,
        },
        { message: "Analytics fetched successfully" },
      ),
    );
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

export { getUrlAnalytics };
