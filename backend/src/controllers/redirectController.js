import { findUrlByShortCode } from "../models/urlModel.js";
import { createClickEvent } from "../models/clickModel.js";
import { incrementStats } from "../models/statsModel.js";
import { ApiResponse } from "../utils/api-response.js";

async function redirect(req, res) {
  try {
    const { shortCode } = req.params;

    const url = await findUrlByShortCode(shortCode);

    if (!url) {
      return res
        .status(404)
        .json(new ApiResponse(404, { message: "URL not found" }));
    }

    // Detect device (basic)
    const userAgent = req.headers["user-agent"] || "";
    const deviceType = /mobile/i.test(userAgent) ? "mobile" : "desktop";

    // Log click
    await createClickEvent({
      urlId: url.id,
      ip: req.ip,
      userAgent,
      deviceType,
      browser: "unknown",
      os: "unknown",
      country: "unknown",
      city: "unknown",
      referrer: req.headers.referer || "",
    });

    // Update stats
    await incrementStats(url.id, deviceType);

    // Redirect
    res.redirect(url.original_url);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

export { redirect };
