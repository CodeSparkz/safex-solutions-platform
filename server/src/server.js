import app, { ensureDbConnected } from "./app.js";

const PORT = Number(process.env.PORT || 5000);

ensureDbConnected()
  .then(() => {
    console.log("Connected to MongoDB Atlas.");
    app.listen(PORT, () => console.log(`SafeX API running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  });
