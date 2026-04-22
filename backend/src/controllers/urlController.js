import { nanoid } from "nanoid";
import {
  createUrl,
  getUrlsByUser,
  findUrlByShortCode,
  deleteUrl,
} from "../models/urlModel.js";
import { createUrlStats } from "../models/statsModel.js";
import { ApiResponse } from "../utils/api-response.js";

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
      }),
    );
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

// get url by short code
async function getUrlByShortCode(req, res) {
  try {
    const { shortCode } = req.params;
    const url = await findUrlByShortCode(shortCode);
    res.status(200).json(
      new ApiResponse(200, url, {
        message: "URL fetched successfully",
      }),
    );
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

// Delete URL
async function deleteUrlController(req, res) {
  try {
    const { urlId } = req.params;
    const userId = req.user.id;

    await deleteUrl(urlId, userId);

    res.status(200).json(
      new ApiResponse(200, null, {
        message: "URL deleted successfully",
      }),
    );
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

export { createShortUrl, getUserUrls, getUrlByShortCode, deleteUrlController };
