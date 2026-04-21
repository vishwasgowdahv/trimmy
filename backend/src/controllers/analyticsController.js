import { getUrlStats } from "../models/statsModel.js";
import { getClicksByUrl } from "../models/clickModel.js";
import { ApiResponse } from "../utils/api-response.js";
import { findUrlByShortCode } from "../models/urlModel.js";

async function getUrlAnalytics(req, res) {
  try {
    const { urlId } = req.params;

    const urlData = await findUrlByShortCode(urlId);

    if (!urlData) {
      return res.status(404).json(new ApiResponse(404, null, "URL not found"));
    }

    const stats = await getUrlStats(urlData.id);
    const clicks = await getClicksByUrl(urlData.id);

    res.status(200).json(
      new ApiResponse(
        200,
        {
          stats,
          clicks,
        },
        { message: "Analytics fetched successfully!!" },
      ),
    );
  } catch (error) {
    console.error("Analytics Error:", error);
    res.status(500).json({ message: "Server error" });
  }
}

export { getUrlAnalytics };
