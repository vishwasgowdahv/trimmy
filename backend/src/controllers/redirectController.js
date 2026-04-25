import geoip from "geoip-lite";
import { UAParser } from "ua-parser-js";
import { findUrlByShortCode } from "../models/urlModel.js";
import { incrementStats } from "../models/statsModel.js";
import { createClickEvent } from "../models/clickModel.js";
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

    const userAgent = req.headers["user-agent"] || "";

    // Detect bots/crawlers
    const isBot = /bot|crawler|spider|whatsapp|facebook|twitter|slack/i.test(
      userAgent,
    );

    // Detect device
    const deviceType = /mobile/i.test(userAgent) ? "mobile" : "desktop";

    // Detect location (country and city)
    // IMPORTANT: Check for x-forwarded-for first (for production)
    const forwarded = req.headers["x-forwarded-for"];
    let ip = forwarded
      ? forwarded.split(",")[0].trim()
      : req.socket.remoteAddress;

    console.log(ip);

    // Remove IPv6 prefix if present (e.g. ::ffff:127.0.0.1)
    if (ip.startsWith("::ffff:")) {
      ip = ip.replace("::ffff:", "");
    }

    // Only use mock IP if it's strictly a local loopback AND we're in development
    // If you are seeing Aachen, DE everywhere, it means your server thinks all requests are from 127.0.0.1
    if (ip === "::1" || ip === "127.0.0.1") {
      // Only mock for local testing; in production, this will be the real IP from the proxy
      if (process.env.NODE_ENV !== "production") {
        ip = "137.226.141.25"; // Aachen, DE mock
      }
    }

    const geo = geoip.lookup(ip);

    // Detect browser and OS
    const ua = UAParser(userAgent);

    // Handle Browser Name
    let browserName = ua.browser?.name;
    if (!browserName) {
      if (isBot) {
        if (/whatsapp/i.test(userAgent)) browserName = "WhatsApp";
        else if (/facebook/i.test(userAgent)) browserName = "Facebook Bot";
        else if (/twitter/i.test(userAgent)) browserName = "Twitter Bot";
        else browserName = "Bot/Crawler";
      } else {
        browserName = "Unknown";
      }
    }

    // Handle OS Name
    let osName = ua.os?.name;
    if (!osName) {
      osName = isBot ? "Bot Service" : "Unknown";
    }

    // Log click
    await createClickEvent({
      urlId: url.id,
      ip: ip,
      userAgent,
      deviceType: isBot ? "bot" : deviceType,
      browser: browserName,
      os: osName,
      country: geo?.country || "Unknown",
      city: geo?.city || "Unknown",
      referrer: req.headers.referer || "Direct",
    });

    // Update stats
    await incrementStats(url.id, isBot ? "bot" : deviceType);

    // Redirect
    res.status(302).redirect(url.original_url);
  } catch (error) {
    console.error("Redirect Error:", error);
    res.status(500).json({ message: "Server error" });
  }
}

export { redirect };
