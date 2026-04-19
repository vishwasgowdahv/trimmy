import { nanoid } from "nanoid";
import { createUrl, getUrlsByUser } from "../models/urlModel.js";
import { createUrlStats } from "../models/statsModel.js";

// Create short URL
async function createShortUrl(req, res) {
  try {
    const { originalUrl } = req.body;
    const userId = req.user.id;

    const shortCode = nanoid(7);

    const urlId = await createUrl(userId, shortCode, originalUrl);

    await createUrlStats(urlId);

    const shortUrl = `${process.env.BASE_URL}/${shortCode}`;

    res.status(201).json(
      new ApiResponse(201, shortUrl, {
        message: "Short URL created",
      }),
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

// Get all URLs of user
async function getUserUrls(req, res) {
  try {
    const userId = req.user.id;

    const urls = await getUrlsByUser(userId);

    res.status(200).json(
      new ApiResponse(200, urls, {
        message: "URLs fetched successfully",
      })
    );
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

export { createShortUrl, getUserUrls };
