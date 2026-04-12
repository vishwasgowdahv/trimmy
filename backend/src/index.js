import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

import app from "./app.js";
import { ENV } from "./config/env.js";
import { testConnection } from "./db/db.js";

const PORT = ENV.PORT || 3000;

testConnection();

app.listen(PORT, () => {
  console.log("server listening on port", PORT);
});
