const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.join(__dirname, "config", "config.env") });

const express = require("express");
const cors = require("cors");
const { connectDB } = require("./Database/db_connection");
const userRouter = require("./routes/userRoutes");
const resourceRouter = require("./routes/resourceRoutes");
const historyRouter = require("./routes/historyRoutes");
const profileRouter = require("./routes/profileRoutes");
const app = express();

console.log(`[BOOT] process.cwd(): ${process.cwd()}`);
console.log(`[BOOT] __dirname: ${__dirname}`);
console.log(`[BOOT] ENV loaded MONGO_URL: ${process.env.MONGO_URL ? process.env.MONGO_URL.slice(0, 12) + '...' : 'undefined'}`);

// CORS configuration
app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Return JSON for payload too large errors
app.use((err, req, res, next) => {
  if (err && err.type === 'entity.too.large') {
    return res.status(413).json({ success: false, message: 'Payload too large' });
  }
  next(err);
});

app.use("/api/v1/user", userRouter);
app.use("/api/v1/resource", resourceRouter);
app.use("/api/v1/history", historyRouter);
app.use("/api/v1/profile", profileRouter);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Full Stack Developer Test API" });
});

const port = process.env.PORT || 3000;

// Connect to database then start server
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}).catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});

module.exports = app;
