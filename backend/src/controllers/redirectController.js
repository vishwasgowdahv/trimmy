import { findUrlByShortCode } from "../models/urlModel.js";
import { createClickEvent } from "../models/clickModel.js";
import { incrementStats } from "../models/statsModel.js";
import { ApiResponse } from "../utils/api-response.js";
import geoip from "geoip-lite";
import { UAParser } from "ua-parser-js";

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

    // Detect location (country and city)
    const ip =
      req.socket.remoteAddress === "::1"
        ? "137.226.141.25"
        : req.socket.remoteAddress;
    const geo = geoip.lookup(ip);

    // Detect browser and OS
    const ua = UAParser(req.headers["user-agent"]);

    // Log click
    await createClickEvent({
      urlId: url.id,
      ip: req.ip,
      userAgent,
      deviceType,
      browser: ua.browser?.name || null,
      os: ua.os?.name || null,
      country: geo?.country || null,
      city: geo?.city || null,
      referrer: req.headers.referer || "",
    });

    // Update stats
    await incrementStats(url.id, deviceType);

    // Redirect
    res.status(302).redirect(url.original_url);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

export { redirect };
