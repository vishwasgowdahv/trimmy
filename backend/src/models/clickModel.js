import { pool } from "../db/db.js";

// Log a click
export async function createClickEvent(data) {
  const {
    urlId,
    ip,
    userAgent,
    deviceType,
    browser,
    os,
    country,
    city,
    referrer,
  } = data;

  await pool.execute(
    `INSERT INTO click_events 
    (url_id, ip_address, user_agent, device_type, browser, os, country, city, referrer)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [urlId, ip, userAgent, deviceType, browser, os, country, city, referrer]
  );
}

// Get clicks for a URL
export async function getClicksByUrl(urlId) {
  const [rows] = await pool.execute(
    `SELECT * FROM click_events WHERE url_id = ?`,
    [urlId]
  );

  return rows;
}