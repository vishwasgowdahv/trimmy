import { getUrlStats } from "../models/statsModel.js";
import { getClicksByUrl } from "../models/clickModel.js";

export async function getUrlAnalytics(req, res) {
  try {
    const { urlId } = req.params;

    const stats = await getUrlStats(urlId);
    const clicks = await getClicksByUrl(urlId);

    res.json({
      stats,
      clicks,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}