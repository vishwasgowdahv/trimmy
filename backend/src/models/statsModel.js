import { pool } from "../db/db.js";

// Initialize stats row
async function createUrlStats(urlId) {
  await pool.execute(`INSERT INTO url_stats (url_id) VALUES (?)`, [urlId]);
}

// Increment stats
async function incrementStats(urlId, deviceType) {
  let deviceColumn = "desktop_clicks";

  if (deviceType === "mobile") deviceColumn = "mobile_clicks";
  else if (deviceType === "tablet") deviceColumn = "tablet_clicks";

  await pool.execute(
    `UPDATE url_stats
     SET total_clicks = total_clicks + 1,
         ${deviceColumn} = ${deviceColumn} + 1,
         last_clicked_at = NOW()
     WHERE url_id = ?`,
    [urlId],
  );
}

// Get stats
async function getUrlStats(urlId) {
  const [rows] = await pool.execute(
    `SELECT * FROM url_stats WHERE url_id = ?`,
    [urlId],
  );

  return rows[0];
}

export { createUrlStats, incrementStats, getUrlStats };
