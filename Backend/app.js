// const express = require("express");
// const app = express();
// const userRouter = require("./routes/userRoutes");
// app.use(express.json());

// app.get("/", (req, res) => {
//   res.json({ message: "Welcome to the Full Stack Developer Test API" });
// });
// app.use("/api/v1/user",userRouter);
// module.exports = app;
import express from "express";
import userRouter from "./routes/userRoutes.js";
import resourceRouter from "./routes/resourceRoutes.js";
import historyRouter from "./routes/historyRoutes.js";
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Full Stack Developer Test API" });
});

app.use("/api/v1/user", userRouter);
app.use("/api/v1/resource", resourceRouter);
app.use("/api/v1/history", historyRouter);

export default app;
